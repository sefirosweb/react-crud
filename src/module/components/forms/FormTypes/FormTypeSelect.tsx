import React from "react";
import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { SelectOption } from "../../../types";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { getFormTypeData } from "../../../api/formTypeSelectData";
import { useGetQueryClient } from "../../../api/useGetQueryClient";

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

const FormTypeSelection = (props: Props) => {
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

  const { data: dataQuery, isLoading: isLoadingQuery } = useQuery<any>({
    queryKey: [selectOptionsUrl],
    queryFn: () => getFormTypeData(selectOptionsUrl),
    refetchOnReconnect: false,
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    setIsLoadingInternal(isLoadingQuery)
  }, [isLoadingQuery])

  useEffect(() => {
    if (!dataQuery) return
    setSelectOptions(parseOptions(dataQuery.data));
  }, [dataQuery])

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


export const FormTypeSelect = (props: Props) => {
  const client = useGetQueryClient()
  return (
    <>
      <QueryClientProvider client={client}>
        <FormTypeSelection {...props} />
      </QueryClientProvider>
    </>
  )
}