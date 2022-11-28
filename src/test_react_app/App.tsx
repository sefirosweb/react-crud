import React from 'react';
import { Container } from 'react-bootstrap';
import { GeneratedData } from '../dataMock';
import { ColumnDefinition, Crud } from '../module';

function App() {

  const columns: Array<ColumnDefinition<GeneratedData>> = [
    {
      accessorKey: "uuid"
    },
    {
      accessorKey: "category"
    },
    {
      accessorKey: "created_at",
      cell: (props) => {
        console.log(typeof (props.row.original.created_at))
        return props?.row?.original?.created_at
      }
    }
  ]

  return (
    <Container className='mt-5'>
      <h1>Tests</h1>
      <Crud
        columns={columns}
        primaryKey='id'
        crudUrl='/api/crud'
      />
    </Container>
  );
}

export default App;
