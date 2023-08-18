
import { Crud } from "../components/forms/Crud";
import { ColumnDefinition, FieldTypes, MultiSelectOptionsColumns } from "../types";
import { startMock, GeneratedData as MoackGeneratedData } from "./dataMock";
import { axiosInstance } from "../lib/axios";
import { DateTime } from "luxon";


export default function App() {
    startMock(axiosInstance)

    const multiSelectOptionsColumnsValues: MultiSelectOptionsColumns<any> = {
        sentKeyAs: 'bbbbb',
        primaryKey: "uuid",
        url: "/api/sub_table",
        getDataUrl: "/api/get_options",
        lazyLoad: true,
        columns: [
            {
                accessorKey: "uuid",
            },
            {
                accessorKey: "name",
            },
        ],
    };


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
            editable: true,
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
        },
        {
            id: "category_id",
            header: "Multi Select",
            editable: true,
            fieldType: FieldTypes.MULTISELECT,
            multiSelectOptions: multiSelectOptionsColumnsValues,
        },
    ]

    return (
        <div>

            <Crud
                sentKeyAs="main_table"
                createButtonTitle="Create Field"
                enableGlobalFilter
                canEdit
                titleOnDelete="name"
                columns={columns}
                primaryKey="uuid"
                crudUrl='/api/crud'
            />
        </div>
    )
}