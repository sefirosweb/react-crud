
import { Crud } from "../components/forms/Crud";
import { ColumnDefinition, FieldTypes } from "../types";
import { startMock, GeneratedData as MoackGeneratedData } from "./dataMock";
import { axiosInstance } from "../lib/axios";


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
            fieldType: FieldTypes.TEXT
        },
        {
            accessorKey: "category",
            enableColumnFilter: true,
        },
        {
            accessorKey: "description",
            fieldType: FieldTypes.TEXT,
            enableColumnFilter: true,
        },

    ]
    return (
        <div>

            <Crud
                createButtonTitle="Create Field"
                canExport
                canEdit
                canDelete
                titleOnDelete="name"
                columns={columns}
                primaryKey="id"
                crudUrl='/api/crud'
            />
        </div>
    )
}