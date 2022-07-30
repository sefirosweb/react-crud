import React from 'react';
import { Form } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { axiosWithCache } from './../../../lib/axiosWithCache';
import { SelectOption } from '../../../types';

export type Props = {
  inputFieldName: string;
  className?: string;
  label?: string;
  isLoading?: boolean;
  handleChange: React.ChangeEventHandler<HTMLSelectElement>;
  value?: any;
  selectOptionsUrl?: string;
  options?: SelectOption[];
};

export const FormTypeSelect = (props: Props) => {
  const {
    inputFieldName,
    isLoading,
    label,
    value,
    handleChange,
    className,
    selectOptionsUrl,
    options,
  } = props;

  const [isLoadingInternal, setIsLoadingInternal] = useState(false);
  const [selectOptions, setSelectOptions] = useState<SelectOption[]>([]);
  const [selectedOption, setSelectedOption] = useState('');
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  });

  useEffect(() => {
    if (typeof isLoading !== 'undefined') {
      setIsLoadingInternal(isLoading);
    }
  }, [isLoading]);

  useEffect(() => {
    if (typeof options !== 'undefined') {
      setSelectOptions(options);
    }
  }, [options]);

  useEffect(() => {
    if (!selectOptionsUrl) return;
    setIsLoadingInternal(true);

    const cancelTokenSource = axios.CancelToken.source();
    axiosWithCache
      .get(selectOptionsUrl, {
        cancelToken: cancelTokenSource.token,
      })
      .then((response) => {
        if (!mounted.current) return;
        const data = response.data.data as SelectOption[];
        setSelectOptions(data);
      })
      .finally(() => {
        setIsLoadingInternal(false);
      });

    return () => {
      cancelTokenSource.cancel();
    };
  }, [selectOptionsUrl]);

  useEffect(() => {
    if (value === undefined) {
      setSelectedOption('');
    } else {
      const realValue =
        typeof value === 'string' || typeof value === 'number'
          ? value
          : value.value;
      setSelectedOption(realValue);
    }
  }, [value]);

  return (
    <Form.Group controlId={inputFieldName} className={className}>
      {label ? <Form.Label>{label}</Form.Label> : ''}
      <Form.Select
        value={selectedOption}
        name={inputFieldName}
        onChange={(e) => {
          setSelectedOption(e.target.value);
          handleChange(e);
        }}
        disabled={isLoadingInternal}
      >
        <option value={''}></option>
        {selectOptions.map((option) => {
          if (typeof option === 'string' || typeof option === 'number') {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          } else {
            return (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            );
          }
        })}
      </Form.Select>
    </Form.Group>
  );
};
