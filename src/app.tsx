import './resources/app.css';

import React, { FC, useCallback, useMemo, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { lazily } from 'react-lazily';
import { LinkContainer } from 'react-router-bootstrap';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { LiveLoadingContainer } from './components/liveloading';
import { CustomNavLink, CustomRouteHandler, LoginState } from './components/route';
import { UserInactiveAlert } from './components/user_inactive_alert';
import { UserDetailsModel } from './models/user';
import { APIAccessor } from './utils/api';
import { AppContext, AppContextData } from './utils/context';

const { LoginPage } = lazily(async () => import('./pages/login'));
const { RegistrationPage } = lazily(async () => import('./pages/register'));

const Routing: FC<{ user?: UserDetailsModel; userLoaded: boolean }> = () => {
    return (
        <Router>
            <Navbar bg="primary" fixed="top" variant="dark">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>foxCaves</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="navbar-nav" />
                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="me-auto">
                            <CustomNavLink login={LoginState.LoggedIn} to="/files">
                                <span>Files</span>
                            </CustomNavLink>
                            <CustomNavLink login={LoginState.LoggedIn} to="/links">
                                <span>Links</span>
                            </CustomNavLink>
                            <CustomNavLink login={LoginState.LoggedOut} to="/login">
                                <span>Login</span>
                            </CustomNavLink>
                            <CustomNavLink login={LoginState.LoggedOut} to="/register">
                                <span>Register</span>
                            </CustomNavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container>
                <UserInactiveAlert />
                <Routes>
                    <Route
                        element={
                            <CustomRouteHandler login={LoginState.LoggedOut}>
                                <LoginPage />
                            </CustomRouteHandler>
                        }
                        path="/login"
                    />
                    <Route
                        element={
                            <CustomRouteHandler login={LoginState.LoggedOut}>
                                <RegistrationPage />
                            </CustomRouteHandler>
                        }
                        path="/register"
                    />
                </Routes>
            </Container>
        </Router>
    );
};

export const App: React.FC = () => {
    const [user, setUser] = useState<UserDetailsModel | undefined>(undefined);
    const [userLoaded, setUserLoaded] = useState(true);
    const apiAccessor: APIAccessor = useMemo(() => {
        return new APIAccessor();
    }, []);

    const refreshUser = useCallback(async () => {
        const newUser = await UserDetailsModel.getById('self', apiAccessor);
        setUser(newUser);
        setUserLoaded(true);
    }, [setUser, setUserLoaded, apiAccessor]);

    const context: AppContextData = useMemo(
        () => ({
            user,
            setUser,
            userLoaded,
            refreshUser,
            apiAccessor,
        }),
        [refreshUser, user, userLoaded, apiAccessor],
    );

    return (
        <AppContext.Provider value={context}>
            <LiveLoadingContainer>
                <Routing user={undefined} userLoaded={userLoaded} />
                <ToastContainer position="bottom-right" theme="colored" />
            </LiveLoadingContainer>
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
