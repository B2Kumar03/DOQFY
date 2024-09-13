import React from 'react';
import "./index.css"
import {   Route, Routes } from 'react-router-dom';
import ProductAdmin from './components/ProductAdmin';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<ProductAdmin/>} />
        </Routes>
    );
};

export default App;
