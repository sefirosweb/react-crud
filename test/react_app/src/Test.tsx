
import { ColumnDefinition, Crud, FieldTypes, axiosInstance } from '@sefirosweb/react-crud';
import { startMock, GeneratedData as MoackGeneratedData } from '../../../react_components/src/test/dataMock'
import { DateTime } from 'luxon';

startMock(axiosInstance)
export const Test = () => {

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
        <>
            <Crud
                columns={columns}
                primaryKey='uuid'
                crudUrl='/api/crud'
                enableGlobalFilter
                canRefresh
            />

        </>
    );
}