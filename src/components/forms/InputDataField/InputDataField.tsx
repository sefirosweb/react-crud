import React, {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  forwardRef,
  Ref,
} from 'react';
import axios from 'axios';
import { Col, Form, InputGroup, Button, Row } from 'react-bootstrap';
import toastr from 'toastr';
import { axiosWithCache } from '../../../lib/axiosWithCache';
import { matchString } from '../../../lib/matchStrings';
import { SelectOption } from '../../../types';

export type PropsRef = {
  clear: Function;
};

export type Props = {
  data?: SelectOption[];
  url?: string;
  label?: string;
  className?: string;
  limit?: number;
  lazyLoad?: boolean;
  onAcceptButton: Function;
  handleChangeFilter?: Function;
  isLoading?: boolean;
};

const parse = (dataToParse: SelectOption[] | string[]) => {
  const result: SelectOption[] = [];

  dataToParse.forEach((i: SelectOption | string) => {
    if (typeof i === 'string') {
      result.push({
        name: i,
        value: i,
      });
    } else {
      result.push({
        name: i.name,
        value: i.value,
      });
    }
  });

  return result;
};

export const InputDataField = forwardRef((props: Props, ref: Ref<PropsRef>) => {
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

  const [filter, setFilter] = useState('');
  const [tempFilters, setTempFilters] = useState('');
  const [dataField, setDataField] = useState<SelectOption[]>(parse(data));
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  });

  useImperativeHandle(ref, () => ({
    clear() {
      setFilter('');
    },
  }));

  const onChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    if (
      handleChangeFilter &&
      {}.toString.call(handleChangeFilter) === '[object Function]'
    ) {
      handleChangeFilter(filter);
    }
  };

  const handleOnAcceptButton = () => {
    const dataFound = dataField.find((d) => {
      const valueToFind = d.name;
      return valueToFind === filter;
    });

    if (!dataFound) {
      toastr.warning('The selected is not correct');
      return;
    }

    if (
      onAcceptButton &&
      {}.toString.call(onAcceptButton) === '[object Function]'
    ) {
      onAcceptButton(dataFound.value);
    }
  };

  useEffect(() => {
    if (!lazyLoad) return;
    const timer = setTimeout(() => {
      setTempFilters(filter);
    }, 400);
    return () => clearTimeout(timer);
  }, [filter, lazyLoad]);

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    if (!url) return;

    axiosWithCache
      .get(url, {
        cancelToken: cancelTokenSource.token,
        params: { filter: tempFilters },
      })
      .then((response) => {
        if (mounted.current) {
          const data = response.data.data as SelectOption[];
          const parsed = parse(data);
          setDataField(parsed);
        }
      });

    return () => {
      cancelTokenSource.cancel();
    };
  }, [url, setDataField, tempFilters]);

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
              <Form.Label>{label}</Form.Label>
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
