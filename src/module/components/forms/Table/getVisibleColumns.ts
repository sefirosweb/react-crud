import { ColumnDefinition } from "../../../types"

const getVisibleColumns = (columnsToFilter: Array<ColumnDefinition<any>>) => {
    const hidenColumns: Record<string, boolean> = {}
    columnsToFilter
        .filter((c) => c.visible === false && (c.accessorKey || c.id))
        .forEach(c => {
            if (c.accessorKey) {
                hidenColumns[c.accessorKey] = false
            }
            if (c.id) {
                hidenColumns[c.id] = false
            }
        })
    return hidenColumns
}

export default getVisibleColumns