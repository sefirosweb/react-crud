import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DateTime } from 'luxon';
import { useCallback, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { ColumnDefinition, Crud, FieldTypes, FormTypeSelect, InputDataField, MultiSelectOptionsColumns, mock, MoackGeneratedData, useGetQueryClient, FormTypes, i18nInstance } from '@sefirosweb/react-crud';

mock.startMock()

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

function App() {
  const [select, setSelect] = useState("")
  const [columns, setColumns] = useState<Array<ColumnDefinition<MoackGeneratedData>>>([]);
  const [data, setData] = useState<Array<any>>([])

  useEffect(() => {
    i18nInstance.changeLanguage('en')
  }, [])

  useEffect(() => {
    const multiSelectOptionsColumnsValues: MultiSelectOptionsColumns<Product> = {
      sentKeyAs: 'bbbbb',
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

    const newColumns: Array<ColumnDefinition<MoackGeneratedData>> = [
      {
        accessorKey: "uuid",
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
        fieldType: FieldTypes.HTML
      },
      {
        visible: false,
        accessorKey: "category_id",
        titleOnCRUD: "Select the category",
        header: "Multi Select",
        editable: true,
        fieldType: FieldTypes.SELECT,
        selectOptionsUrl: '/api/get_options'
      },
      {
        accessorKey: "categories",
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

  const handleFetch = useCallback((res: Array<any>) => {
    setData(res)
  }, []);

  const queryClient = useGetQueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Container className='mt-5'>

          <FormTypes
            controlId='asd'
            name='asd'
            type={FieldTypes.NUMBER}
          />
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
                createButtonTitle='Crear'
                canDelete
                canEdit
                canRefresh
                lazyLoad
                titleOnDelete='ean'
                enableGlobalFilter
                primaryKey='uuid'
                sentKeyAs='newPrimaryKeyName'
                crudUrl='/api/crud'
                handleFetch={handleFetch}
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
