import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { GeneratedData } from '../dataMock';
import { ColumnDefinition, Crud, FormTypeSelect } from '../module';

function App() {
  const [select, setSelect] = useState("")
  const [columns, setColumns] = useState<Array<ColumnDefinition<GeneratedData>>>([]);

  useEffect(() => {
    const newColumns: Array<ColumnDefinition<GeneratedData>> = [
      {
        accessorKey: "uuid",
        visible: false
      },
      {
        accessorKey: "ean"
      },
      {
        accessorKey: "category"
      },
      {
        accessorKey: "description"
      },
      {
        accessorKey: "created_at",
        cell: (props) => DateTime.fromISO(props.row.original.created_at).toISODate()
      }
    ]
    setColumns(newColumns)
  }, [])


  const customButtons =
    <>
      <FormTypeSelect
        label='Select category'
        name='felectCategoryField'
        controlId='felectCategoryField'
        value={select}
        handleChange={(e) => setSelect(e.target.value)}
        selectOptionsUrl='/api/get_options'
      />
    </>

  return (
    <>
      <Container className='mt-5'>
        <h1>Tests</h1>
        <Crud
          customButtons={customButtons}
          columns={columns}
          canDelete
          canRefresh
          enableGlobalFilter
          primaryKey='uuid'
          crudUrl='/api/crud'
        />
      </Container>
    </>
  );
}

export default App;