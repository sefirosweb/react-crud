import Select from 'react-select'
import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { SelectOption } from "../../../types";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { getFormTypeData } from "../../../api/formTypeSelectData";
import { useGetQueryClient } from "../../../api/useGetQueryClient";

type Option = { label: string, value: string }

export type Props = {
  name: string;
  controlId: string;
  className?: string;
  label?: string;
  isLoading?: boolean;
  isInvalid?: boolean;
  readonly?: boolean;
  handleChange: (option: SelectOption | null) => void;
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
    readonly = false,
    isInvalid
  } = props;

  const [isLoadingInternal, setIsLoadingInternal] = useState(false);
  const [selectOptions, setSelectOptions] = useState<Option[]>([]);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

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

  const parseOptions = (options: SelectOption[] | string[]): Option[] => {
    return options.map((o) => {
      if (typeof o === "string") {
        return {
          label: o,
          value: o,
        };
      } else {
        return {
          label: o.name,
          value: o.value
        };
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
    let newValue: string | null
    if (value === undefined) {
      newValue = null
    } else if (typeof value === "string") {
      newValue = value
    } else if (typeof value === "number") {
      newValue = value.toString()
    } else {
      newValue = value.value
    }

    const find = selectOptions.find(o => o.value === newValue)
    setSelectedOption(find ?? null)

  }, [value]);

  const onChange = (option: Option | null) => {
    setSelectedOption(option);
    if (!option) {
      handleChange(null);
    } else {
      const parseOption: SelectOption = {
        name: option.label,
        value: option.value
      }

      handleChange(parseOption);
    }
  }

  return (
    <Form.Group controlId={controlId} className={className}>
      {label ? <Form.Label>{label}</Form.Label> : ""}
      <Select
        isClearable
        value={selectedOption}
        onChange={onChange}
        name={name}
        isLoading={isLoadingInternal || readonly}
        options={selectOptions} />
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