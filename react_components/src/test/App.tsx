import { useEffect, useState } from "react";
import { Crud } from "../components/forms/Crud";
import { FormTypeHtml } from "../components/forms/FormTypes";
import { ColumnDefinition } from "../types";

export default function App() {

    const [value, setValue] = useState(`<h1>Default te&nbsp; &nbsp; &nbsp; <span style="color: rgb(156, 220, 254);">console</span>.<span style="color: rgb(220, 220, 170);">log</span>(<span style="color: rgb(206, 145, 120);">'unmount'</span>)xt</h1><p>Lol</p><p>sadsa</p><p>dasdasdsa</p><p><br></p><p>asd</p>`)

    useEffect(() => {
        console.log(value)
    }, [value])

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
            <div>
                <FormTypeHtml
                    label="Insert HTML Here"
                    value={value}
                    setValue={setValue}
                    options={{
                        readOnly: false
                    }}
                />
            </div>
            <div className="mt-5"> Hello world</div>
            <Crud
                canExport
                columns={columns}
                primaryKey="id"
                data={data}
            />
        </div>
    )
}