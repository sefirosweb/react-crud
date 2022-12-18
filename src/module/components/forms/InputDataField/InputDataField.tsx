import React, {
  useEffect,
  useImperativeHandle,
  useState,
  forwardRef,
  Ref,
} from "react";
import { Col, Form, InputGroup, Button, Row } from "react-bootstrap";
import toastr from "toastr";
import { matchString } from "../../../lib/matchStrings";
import { SelectOption, DataField } from "../../../types";
import { getInputDataField } from "../../../api/formTypeSelectData";
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from "@tanstack/react-query";

export type PropsRef = {
  clear: () => void;
};

export type Props = {
  data?: SelectOption[];
  url?: string;
  label?: string;
  className?: string;
  limit?: number;
  lazyLoad?: boolean;
  onAcceptButton: (value: DataField) => void;
  handleChangeFilter?: (filter: string) => void;
  isLoading?: boolean;
};

const parse = (dataToParse: SelectOption[] | string[]) => {
  const result: SelectOption[] = [];

  dataToParse.forEach((i: SelectOption | string) => {
    if (typeof i === "string") {
      result.push({
        name: i,
        value: i,
      });
    } else {
      result.push(i);
    }
  });

  return result;
};

const InputDataFieldBox = forwardRef((props: Props, ref: Ref<PropsRef>) => {
  const {
    data = [],
    limit = 10,
    lazyLoad = false,
    onAcceptButton,
    handleChangeFilter,
    url,
    isLoading,
    label,
    className,
  } = props;

  const [filter, setFilter] = useState("");
  const [tempFilters, setTempFilters] = useState("");
  const [dataField, setDataField] = useState<SelectOption[]>(parse(data));

  const { data: dataQuery } = useQuery<any>({
    queryKey: [url, tempFilters],
    queryFn: () => getInputDataField(url, tempFilters),
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity
  })

  useEffect(() => {
    if (!dataQuery) return
    const data = dataQuery.data as SelectOption[];
    const parsed = parse(data);
    setDataField(parsed);
  }, [dataQuery, setDataField])

  useImperativeHandle(ref, () => ({
    clear() {
      setFilter("");
    },
  }));

  const onChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    if (
      handleChangeFilter &&
      {}.toString.call(handleChangeFilter) === "[object Function]"
    ) {
      handleChangeFilter(filter);
    }
  };

  const handleOnAcceptButton = () => {
    const dataFound: DataField | undefined = dataField.find((d) => {
      const valueToFind = d.name;
      return valueToFind === filter;
    });

    if (!dataFound) {
      toastr.warning("The selected is not correct");
      return;
    }

    if (
      onAcceptButton &&
      {}.toString.call(onAcceptButton) === "[object Function]"
    ) {
      onAcceptButton(dataFound);
    }
  };

  useEffect(() => {
    if (!lazyLoad) return;
    const timer = setTimeout(() => {
      setTempFilters(filter);
    }, 400);
    return () => clearTimeout(timer);
  }, [filter, lazyLoad]);

  const options = () => {
    const items = dataField.filter((i) => {
      return matchString(i.name, filter);
    });

    if (items.length > limit) {
      items.splice(0, items.length - limit);
    }

    return items.map((item) => <option key={item.value} value={item.name} />);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleOnAcceptButton();
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Row>
          <Col>
            <Form.Group className={className}>
              {label && <Form.Label>{label}</Form.Label>}
              <InputGroup className="d-flex justify-content-end">
                <Form.Control
                  list="data"
                  onChange={onChangeFilter}
                  value={filter}
                  placeholder="Buscar"
                  readOnly={isLoading}
                />
                <datalist id="data">{options()}</datalist>
                <Button onClick={handleOnAcceptButton} disabled={isLoading}>
                  Añadir
                </Button>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </>
  );
});


const queryClient = new QueryClient()

export const InputDataField = (props: Props & { ref?: Ref<PropsRef> }) => {
  try {
    const client = useQueryClient()
    return (
      <QueryClientProvider client={client}>
        <InputDataFieldBox {...props} />
      </QueryClientProvider >
    )
  } catch (e) {
    return (
      <QueryClientProvider client={queryClient}>
        <InputDataFieldBox {...props} />
      </QueryClientProvider >
    )
  }

}