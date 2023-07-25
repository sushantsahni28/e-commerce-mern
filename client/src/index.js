import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import { CommContextProvider } from './Context/CommContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <CommContextProvider>
            <App />
        </CommContextProvider>
    </BrowserRouter>
);

