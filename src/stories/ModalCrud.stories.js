import React from 'react'
import { ModalCrud } from '../components/form/ModalCrud'
import { Button } from 'react-bootstrap'
import useState from 'storybook-addon-state'

export default {
    title: 'Form/ModalCrud',
    component: ModalCrud,
}

const Template = (/*args*/) => {
    const [show, setShow] = useState('show', false)
    const [crud, setCrud] = useState('crud', 'CREATE')
    const [modalData, setModalData] = useState('modalData', {})

    const [response, setResponse] = useState('response', '')

    const columns = [
        {
            primaryKey: true,
            Header: '#',
            accessor: 'id',
        },
        {
            titleOnDelete: true,
            titleOnCRUD: 'Item Type',
            Header: 'Table Name',
            accessor: 'nombre',
            editable: true,
        },
        {
            titleOnCRUD: 'URL',
            Header: 'URL',
            accessor: 'url',
            editable: true,
        },
        {
            titleOnCRUD: 'API KEY',
            Header: 'API KEY',
            accessor: 'api_key',
            editable: true,
        },
    ]

    const handleSuccess = (response) => {
        console.log({ response })
        setResponse(JSON.stringify(response.data))
        console.log('Submited form')
    }

    return (
        <>
            <p>
                <Button
                    onClick={() => {
                        setCrud('CREATE')
                        setShow(true)
                    }}
                >
                    CREATE
                </Button>
            </p>
            <p>
                <Button
                    onClick={() => {
                        setCrud('UPDATE')
                        setShow(true)
                        setModalData({
                            id: 5,
                            nombre: 'Core I7 10º gen',
                            url: 'http://goologoolo.com',
                            api_key: '·$ADADFTWSEGF%G%Gg45',
                        })
                    }}
                >
                    UPDATE
                </Button>
            </p>
            <p>
                <Button
                    onClick={() => {
                        setCrud('DELETE')
                        setShow(true)
                        setModalData({
                            id: 5,
                            nombre: 'Core I7 10º gen',
                            url: 'http://goologoolo.com',
                            api_key: '·$ADADFTWSEGF%G%Gg45',
                        })
                    }}
                >
                    DELETE
                </Button>
            </p>

            <p>
                Response: <br />
                {response}
            </p>

            <ModalCrud
                show={show}
                setShow={setShow}
                fields={columns}
                title={'Title Modal Crud'}
                modalData={modalData}
                setModalData={setModalData}
                crud={crud}
                url={'/api/crud'}
                handleSuccess={handleSuccess}
                primaryKey={'id'}
                titleOnDelete={'name'}
            />
        </>
    )
}

export const Default = Template.bind({})
Default.args = {}
