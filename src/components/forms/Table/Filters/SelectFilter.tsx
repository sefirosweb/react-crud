import { useEffect, useState } from "react";
import { FormTypeSelect } from "../../FormTypes"
import { FilterType, FilterTypeText } from "../../../../types";
import { Column } from "@tanstack/react-table";

type Props = {
    column: Column<any, unknown>;
    setColumnFilter: (filter: FilterType) => void;
}

export const SelectFilter = (props: Props) => {
    const { column, setColumnFilter } = props;

    const [filter, setFilter] = useState<FilterTypeText>({
        type: 'text',
        value: ""
    });

    useEffect(() => {
        setColumnFilter(filter);
    }, [filter]);

    return (
        <>
            <FormTypeSelect
                handleChange={(e) => setFilter({ ...filter, value: e.target.value })}
                name={column.id + "_select"}
                controlId={column.id + "_select"}
                selectOptionsUrl={column.columnDef.meta?.selectOptionsUrl}
                value={filter.value}
            />
            <div className="h-1" />
        </>
    )
}