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
  const firstValue = column.columnDef.meta?.fieldType ?? FieldTypes.TEXT;

  const [filter, setFilter] = useState<any>("");

  useEffect(() => {
    setColumnFilter(filter);
  }, [filter]);

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
                value={(filter as [number, number])?.[0] ?? ""}
                onChange={(value) =>
                  setFilter((old: [number, number]) => [value, old?.[1]])
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
                value={(filter as [number, number])?.[1] ?? ""}
                onChange={(value) =>
                  setFilter((old: [number, number]) => [old?.[0], value])
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
        placeholder={`Search...`}
        className="form-control"
        list={column.id + "_list"}
      />
      <div className="h-1" />
    </>
  );
}
