
import { Crud } from "../components/forms/Crud";
import { ColumnDefinition, FieldTypes } from "../types";
import { startMock, GeneratedData as MoackGeneratedData } from "./dataMock";
import { axiosInstance } from "../lib/axios";
import { DateTime } from "luxon";


export default function App() {
    startMock(axiosInstance)
    const columns: Array<ColumnDefinition<MoackGeneratedData>> = [
        {
            accessorKey: "uuid",
            enableColumnFilter: true,
        },
        {
            accessorKey: "ean",
            enableColumnFilter: true,
        },
        {
            accessorKey: "category",
            enableColumnFilter: true,
        },
        {
            accessorKey: "description",
            enableColumnFilter: true,
        },
        {
            accessorKey: "random",
            enableColumnFilter: true,
        },
        {
            accessorKey: "created_at",
            enableColumnFilter: true,
            fieldType: FieldTypes.DATE,
            accessorFn: (props) => DateTime.fromISO(props.created_at).toMillis(),
            cell: (props) => DateTime.fromISO(props.row.original.created_at).toISODate()
        }
    ]

    return (
        <div>

            <Crud
                createButtonTitle="Create Field"
                enableGlobalFilter
                titleOnDelete="name"
                columns={columns}
                primaryKey="id"
                crudUrl='/api/crud'
            />
        </div>
    )
}