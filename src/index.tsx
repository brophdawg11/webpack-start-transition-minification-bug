import React from 'react';
import { createRoot } from 'react-dom/client';
import { LinkContainer } from 'react-router-bootstrap';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
const root = createRoot(document.getElementById('root')!);

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <LinkContainer to="/">
                <span>foxCaves</span>
            </LinkContainer>
            &nbsp;
            <NavLink to="/login">
                <span>Login</span>
            </NavLink>
            &nbsp;
            <NavLink to="/register">
                <span>Register</span>
            </NavLink>
            <Routes>
                <Route element={<h1>home</h1>} path="/" />
                <Route element={<h1>Login</h1>} path="/login" />
                <Route element={<h1>Register</h1>} path="/register" />
            </Routes>
        </BrowserRouter>
    );
};

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
