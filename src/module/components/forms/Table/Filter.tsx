import { DebouncedInput } from "./DebouncedInput";

import { Column } from "@tanstack/react-table";
import React, { useEffect, useMemo, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { FieldTypes } from "../../../types";
import { FormTypeSelect } from "../FormTypes/FormTypeSelect";

type Props = {
  column: Column<any, unknown>;
  setColumnFilter: React.Dispatch<React.SetStateAction<any>>;
};

export function Filter(props: Props) {
  const { column, setColumnFilter } = props;
  const filterType = column.columnDef.meta?.fieldType ?? FieldTypes.TEXT;

  const [filter, setFilter] = useState<FilterType>("");

  useEffect(() => {
    setColumnFilter(filter);
  }, [filter]);

  const sortedUniqueValues = useMemo(
    () =>
      filterType === FieldTypes.NUMBER
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  );

  if (filterType === FieldTypes.NUMBER)
    return (
      <div>
        <div className="flex space-x-2">
          <Row>
            <Col>
              <DebouncedInput
                type="number"
                min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
                max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
                value={(filter as [number, number])?.[0]?.toString() ?? ""}
                onChange={(value) => {
                  const newData = [parseInt(value), filter[1]] as [number, number]
                  setFilter(newData)
                }}
                placeholder="Min"
                className="form-control"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <DebouncedInput
                type="number"
                min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
                max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
                value={(filter as [number, number])?.[1]?.toString() ?? ""}
                onChange={(value) => {
                  const newData = [filter[0], parseInt(value)] as [number, number]
                  setFilter(newData)
                }}
                placeholder="Max"
                className="form-control"
              />
            </Col>
          </Row>
        </div>
        <div className="h-1" />
      </div>
    );

  if (filterType === FieldTypes.SELECT)
    return (
      <>
        <FormTypeSelect
          handleChange={(e) => setFilter(e.target.value)}
          inputFieldName={column.id + "_select"}
          selectOptionsUrl={column.columnDef.meta?.selectOptionsUrl}
          value={(filter as string | number) ?? ""}
        />
        <div className="h-1" />
      </>
    );

  return (
    <>
      {column.columnDef.meta?.dropdown && (
        <datalist id={column.id + "_list"}>
          {sortedUniqueValues.slice(0, 100).map((value: any) => (
            <option value={value} key={value} />
          ))}
        </datalist>
      )}

      <DebouncedInput
        type="text"
        value={(filter ?? "") as string}
        onChange={(value) => setFilter(value)}
        className="form-control"
        list={column.id + "_list"}
      />
      <div className="h-1" />
    </>
  );
}
