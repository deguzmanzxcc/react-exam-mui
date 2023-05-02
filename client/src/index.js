import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Invoices from './invoiceList';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import CreateInvoice from './createInvoice';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path= "/" element={<Invoices />}/> 
      <Route path= "/create" element={<CreateInvoice />}/>
      <Route path= "/create/invoices" element={<Invoices />}/>     
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

