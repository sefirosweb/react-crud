import { DebouncedInput } from "./DebouncedInput";

import { Column } from "@tanstack/react-table";
import React, { useMemo } from "react";
import { Row, Col } from "react-bootstrap";
import { FieldTypes } from "../../../types";
import { FormTypeSelect } from "../FormTypes/FormTypeSelect";

type Props = {
  column: Column<any, unknown>;
};

export function Filter(props: Props) {
  const { column } = props;
  const firstValue = column.columnDef.meta?.fieldType ?? FieldTypes.TEXT;

  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = useMemo(
    () =>
      firstValue === FieldTypes.NUMBER
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  );

  if (firstValue === FieldTypes.NUMBER)
    return (
      <div>
        <div className="flex space-x-2">
          <Row>
            <Col>
              <DebouncedInput
                type="number"
                min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
                max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
                value={(columnFilterValue as [number, number])?.[0] ?? ""}
                onChange={(value) =>
                  column.setFilterValue((old: [number, number]) => [
                    value,
                    old?.[1],
                  ])
                }
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
                value={(columnFilterValue as [number, number])?.[1] ?? ""}
                onChange={(value) =>
                  column.setFilterValue((old: [number, number]) => [
                    old?.[0],
                    value,
                  ])
                }
                placeholder="Max"
                className="form-control"
              />
            </Col>
          </Row>
        </div>
        <div className="h-1" />
      </div>
    );

  if (firstValue === FieldTypes.SELECT)
    return (
      <>
        <FormTypeSelect
          handleChange={(e) => column.setFilterValue(e.target.value)}
          inputFieldName={column.id + "_select"}
          selectOptionsUrl={column.columnDef.meta?.selectOptionsUrl}
          value={(columnFilterValue as string | number) ?? ""}
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
        value={(columnFilterValue ?? "") as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search...`}
        className="form-control"
        list={column.id + "_list"}
      />
      <div className="h-1" />
    </>
  );
}
