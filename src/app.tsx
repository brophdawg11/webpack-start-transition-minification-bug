import React, { useMemo } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { CustomNavLink, LoginState } from './components/route';
import { APIAccessor } from './utils/api';
import { AppContext, AppContextData } from './utils/context';

export const App: React.FC = () => {
    const context: AppContextData = useMemo(
        () => ({
            user: undefined,
            setUser: () => {
                // no op
            },
            userLoaded: true,
            refreshUser: () => {
                // no op
            },
            apiAccessor: new APIAccessor(),
        }),
        [],
    );

    return (
        <AppContext.Provider value={context}>
            <Router>
                <LinkContainer to="/">
                    <Navbar.Brand>foxCaves</Navbar.Brand>
                </LinkContainer>
                &nbsp;
                <CustomNavLink login={LoginState.LoggedOut} to="/login">
                    <span>Login</span>
                </CustomNavLink>
                &nbsp;
                <CustomNavLink login={LoginState.LoggedOut} to="/register">
                    <span>Register</span>
                </CustomNavLink>
                <Routes>
                    <Route element={<h1>home</h1>} path="/" />
                    <Route element={<h1>Login</h1>} path="/login" />
                    <Route element={<h1>Register</h1>} path="/register" />
                </Routes>
            </Router>
        </AppContext.Provider>
    );
};

/*
 * export const App: React.FC = () => {
 *     return (
 *         <Router>
 *             <Navbar bg="primary" fixed="top" variant="dark">
 *                 <Container>
 *                     <LinkContainer to="/">
 *                         <Navbar.Brand>foxCaves</Navbar.Brand>
 *                     </LinkContainer>
 *                     <Navbar.Toggle aria-controls="navbar-nav" />
 *                     <Navbar.Collapse id="navbar-nav">
 *                         <Nav className="me-auto">
 *                             <Link to="/login">
 *                                 <span>Login</span>
 *                             </Link>
 *                             <Link to="/register">
 *                                 <span>Register</span>
 *                             </Link>
 *                         </Nav>
 *                     </Navbar.Collapse>
 *                 </Container>
 *             </Navbar>
 *             <Container>
 *                 <Routes>
 *                     <Route element={<h1>Login</h1>} path="/login" />
 *                     <Route element={<h1>Registration</h1>} path="/register" />
 *                 </Routes>
 *             </Container>
 *         </Router>
 *     );
 * };
 */
