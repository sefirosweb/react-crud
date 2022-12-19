import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { GeneratedData } from '../dataMock';
import { ColumnDefinition, Crud, FieldTypes, FormTypeSelect, InputDataField, MultiSelectOptionsColumns } from '../module';

type Product = {
  uuid: string;
  ean: number;
  name: string;
  description: string;
  price: number;
  category: string;
  category_id: string;
  created_at: string;
  category_list: string;
};

const queryClient = new QueryClient()

function App() {
  const [select, setSelect] = useState("")
  const [columns, setColumns] = useState<Array<ColumnDefinition<GeneratedData>>>([]);

  useEffect(() => {
    const multiSelectOptionsColumnsValues: MultiSelectOptionsColumns<Product> = {
      sentKeyAs: 'id_item',
      primaryKey: "uuid",
      url: "/api/sub_table",
      getDataUrl: "/api/get_options",
      lazyLoad: true,
      onExitModal: () => {
        console.log("Log on exit modal");
      },
      title: "Editing Table Multi Select",
      columns: [
        {
          accessorKey: "uuid",
        },
        {
          accessorKey: "name",
        },
      ],
    };

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
        accessorKey: "category_id",
        header: "Multi Select",
        editable: true,
        fieldType: FieldTypes.MULTISELECT,
        multiSelectOptions: multiSelectOptionsColumnsValues,
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
          <Row>
            <Col>
              <InputDataField
                label={'Search by text'}
                url={'/api/get_options'}
                lazyLoad
                onAcceptButton={(resultDataField) => {
                  console.log({ resultDataField })
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col>
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
            </Col>
          </Row>
        </Container>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
