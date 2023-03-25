import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './app.scss'

import { Container } from 'react-bootstrap';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Container className='mt-5'>
            <App />
        </Container>
    </React.StrictMode>,
)
