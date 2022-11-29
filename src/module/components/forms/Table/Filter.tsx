import React, { useEffect, useMemo, useState } from "react";
import { Column } from "@tanstack/react-table";
import { Row, Col } from "react-bootstrap";
import { FieldTypes } from "../../../types";
import { FormTypeSelect } from "../FormTypes/FormTypeSelect";
import { DebouncedInput } from "./DebouncedInput";
import { DateTime } from "luxon";

type Props = {
  column: Column<any, unknown>;
  setColumnFilter: React.Dispatch<React.SetStateAction<any>>;
};

export function Filter(props: Props) {
  const { column, setColumnFilter } = props;
  const filterType = column.columnDef.meta?.fieldType ?? FieldTypes.TEXT;

  const [filter, setFilter] = useState<FilterType>("");

  useEffect(() => {
    console.log('detected filter changed')
    console.log({ filter })
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

  if (filterType === FieldTypes.DATE)
    return (
      <>
        <Row>
          <Col>
            <DebouncedInput
              type="date"
              value={(filter as [number, number])?.[0] && typeof (filter as [number, number])?.[0] === "number" ? DateTime.fromMillis((filter as [number, number])?.[0]).toISODate() : ''}
              onChange={(value) => {
                const newValue = DateTime.fromISO(value).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).toMillis();
                const newData = [newValue, filter[1]] as [number, number]
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
              type="date"
              value={(filter as [number, number])?.[1] && typeof (filter as [number, number])?.[1] === "number" ? DateTime.fromMillis((filter as [number, number])?.[1]).plus({ day: -1 }).toISODate() : ''}
              onChange={(value) => {
                const newValue = DateTime.fromISO(value).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).plus({ day: 1 }).toMillis();
                const newData = [filter[0], newValue] as [number, number]
                setFilter(newData)
              }}
              placeholder="Max"
              className="form-control"
            />
          </Col>
        </Row>
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
