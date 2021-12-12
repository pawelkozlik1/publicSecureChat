import React, { useEffect } from 'react';
import { CssBaseline } from '@material-ui/core';
import { useRecoilState } from 'recoil';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home/Home';
import UsersAPI from './services/users';
import 'react-toastify/dist/ReactToastify.css';
import './styling/toasts.css';
import { userState } from './state/atoms';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';

const App = () => {
    const [user, setUser] = useRecoilState(userState);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await UsersAPI.validateUser();
                setUser(userData);
            } catch (ex) {
                console.log(ex.message);
            }
        };
        fetchUser();
    }, []);

    return (
        <>
            <CssBaseline />
            <ToastContainer
                position='bottom-right'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
            />
            <Router>
                <Switch>
                    <Route path='/dashboard'>
                        {user.id ? <Dashboard /> : <Redirect to='/' />}
                    </Route>
                    <Route path='/' exact>
                        {user.id ? <Redirect to='/dashboard' /> : <Home />}
                    </Route>
                </Switch>
            </Router>
        </>
    );
};

export default App;
