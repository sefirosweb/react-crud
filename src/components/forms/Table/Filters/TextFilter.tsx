import { useEffect, useMemo, useState } from "react";
import { FilterType, FilterTypeText } from "../../../../types";
import { Column } from "@tanstack/react-table";
import { DebouncedInput } from "../DebouncedInput";

type Props = {
    column: Column<any, unknown>;
    setColumnFilter: (filter: FilterType) => void;
}

export const TextFilter = (props: Props) => {
    const { column, setColumnFilter } = props;

    const [filter, setFilter] = useState<FilterTypeText>({
        type: 'text',
        value: ""
    });

    const sortedUniqueValues = useMemo(
        () => Array.from(column.getFacetedUniqueValues().keys()).sort(),
        [column.getFacetedUniqueValues()]
    );

    useEffect(() => {
        setColumnFilter(filter);
    }, [filter]);


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
                value={filter.value}
                onChange={(value) => setFilter({ ...filter, value })}
                className="form-control"
                list={column.id + "_list"}
            />
            <div className="h-1" />
        </>
    )
}