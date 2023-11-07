import React from "react";
import { Route, Routes } from 'react-router-dom';

import Layout from "./Layout";
import Main from "./Main";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Layout />} >
                    <Route index element={<Main />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
