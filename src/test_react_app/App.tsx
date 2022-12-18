import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { GeneratedData } from '../dataMock';
import { ColumnDefinition, Crud, FieldTypes, FormTypeSelect } from '../module';

const queryClient = new QueryClient()

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
        accessorKey: "description",
        enableColumnFilter: true,
        editable: true,
        fieldType: FieldTypes.TEXTAREA
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
      <QueryClientProvider client={queryClient}>
        <Container className='mt-5'>
          <h1>Tests</h1>
          <Crud
            customButtons={customButtons}
            columns={columns}
            canDelete
            canEdit
            canRefresh
            lazyLoad
            enableGlobalFilter
            primaryKey='uuid'
            crudUrl='/api/crud'
          />
        </Container>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
