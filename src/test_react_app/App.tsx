import React from 'react';
import { ColumnDefinition, Crud } from '../module';
function App() {

  const columns: Array<ColumnDefinition<any>> = [
    {
      id: "id",
      accessorKey: "id"
    },
    {
      id: "asdasdasd",
      accessorKey: "asdasdasd"
    }
  ]

  const data = [
    {
      id: "1",
      asdasdasd: 'a'
    },
    {
      id: "2",
      asdasdasd: 'b'
    }
  ]
  return (
    <div>
      Testomg
      <Crud
        columns={columns}
        primaryKey='id'
        data={data}
      />

    </div>
  );
}

export default App;
