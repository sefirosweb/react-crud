import { Crud } from "../components/forms/Crud";
import { ColumnDefinition } from "../types";

export default function App() {

    const columns: Array<ColumnDefinition<any>> = [
        {
            accessorKey: "id"
        }
    ]

    const data = [
        {
            id: 5
        }
    ]

    return (
        <div>
            Hello world
            <Crud
                columns={columns}
                primaryKey="id"
                data={data}
            />
        </div>
    )
}