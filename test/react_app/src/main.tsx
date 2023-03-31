import React from 'react'
import ReactDOM from 'react-dom/client'

import './app.scss';

import { Container } from 'react-bootstrap';
// import { Test } from './Test';
// import { TestComponent } from './TestComponent';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Container className='mt-5'>
      {/* <Test /> */}
      <App />
      {/* <TestComponent /> */}
    </Container>
  </React.StrictMode>,
)
