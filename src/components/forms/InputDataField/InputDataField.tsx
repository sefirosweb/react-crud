import React, { useEffect, useImperativeHandle, useState, forwardRef, Ref } from "react";
import { Col, Form, InputGroup, Button, Row } from "react-bootstrap";
import toastr from "toastr";
import { matchString } from "../../../lib/matchStrings";
import { SelectOption, DataField } from "../../../types";
import { getInputDataField } from "../../../api/formTypeSelectData";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { useGetQueryClient } from "../../../api/useGetQueryClient";
import { useTranslation } from "react-i18next";

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

const parse = (dataToParse: Array<SelectOption> | Array<string>) => {
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

  const { t } = useTranslation()

  const { data: dataQuery } = useQuery({
    queryKey: [url, tempFilters],
    queryFn: () => getInputDataField(url, tempFilters),
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity
  })

  useEffect(() => {
    if (!dataQuery) return
    const parsed = parse(dataQuery);
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
      toastr.warning(t('error.wrong_selected') as string);
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
                  {t('Add')}
                </Button>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </>
  );
});

export const InputDataField = forwardRef((props: Props, ref: Ref<PropsRef>) => {
  const client = useGetQueryClient()
  return (
    <QueryClientProvider client={client}>
      <InputDataFieldBox {...props} ref={ref} />
    </QueryClientProvider >
  )
})