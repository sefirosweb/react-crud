import React from "react";
import { Form } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { axiosWithCache } from "./../../../lib/axiosWithCache";
import { SelectOption } from "../../../types";

export type Props = {
  name: string;
  controlId: string;
  className?: string;
  label?: string;
  isLoading?: boolean;
  readonly?: boolean;
  handleChange: React.ChangeEventHandler<HTMLSelectElement>;
  value?: string | number | SelectOption;
  selectOptionsUrl?: string;
  options?: SelectOption[] | string[];
};

export const FormTypeSelect = (props: Props) => {
  const {
    name,
    controlId,
    isLoading,
    label,
    value,
    handleChange,
    className,
    selectOptionsUrl,
    options,
    readonly = false
  } = props;

  const [isLoadingInternal, setIsLoadingInternal] = useState(false);
  const [selectOptions, setSelectOptions] = useState<SelectOption[]>([]);
  const [selectedOption, setSelectedOption] = useState("");
  const mounted = useRef(false);

  const parseOptions = (options: SelectOption[] | string[]): SelectOption[] => {
    return options.map((o) => {
      if (typeof o === "string") {
        return {
          name: o,
          value: o,
        };
      } else {
        return o;
      }
    });
  };

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (typeof isLoading !== "undefined") {
      setIsLoadingInternal(isLoading);
    }
  }, [isLoading]);

  useEffect(() => {
    if (typeof options !== "undefined") {
      setSelectOptions(parseOptions(options));
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
        const data = response.data.data as SelectOption[] | string[];
        setSelectOptions(parseOptions(data));
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
      setSelectedOption("");
    } else if (typeof value === "string") {
      setSelectedOption(value);
    } else if (typeof value === "number") {
      setSelectedOption(value.toString());
    } else {
      setSelectedOption(value.value);
    }
  }, [value]);

  return (
    <Form.Group controlId={controlId} className={className}>
      {label ? <Form.Label>{label}</Form.Label> : ""}
      <Form.Select
        value={selectedOption}
        name={name}
        onChange={(e) => {
          setSelectedOption(e.target.value);
          handleChange(e);
        }}
        disabled={isLoadingInternal || readonly}
      >
        <option value={""}></option>
        {selectOptions.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          );
        })}
      </Form.Select>
    </Form.Group>
  );
};
