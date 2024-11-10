import '../App.css';
import { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import Homepage from './homepage';
import Question from './question';
import CreateQuestion from './createquestion';
import Nav from './nav';
import LeaderBoard from './leaderboard';
import Login from './login';
import PrivateRoute from './privateRoute';
import {Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Error404 from './error404';

import { useDispatch } from 'react-redux';
import { loginUser } from '../actions/authedUser'; // Import your loginUser action

function App(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        // if (storedAuthedUser) {
        //     dispatch(loginUser(storedAuthedUser));
        // };
        // if(storedAuthedUser === null){
        //     navigate('/login', { state: { from: location.pathname} });
        // }
        
        dispatch(handleInitialData());
    }, [dispatch, location.pathname, navigate, props]);

    const showNav = location.pathname !== '/login';

    return (
        <Fragment>
            <div className='app-container'>
                {showNav && <Nav/>}
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route element = {<PrivateRoute/>}>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/questions/:id" element={<Question />} />
                        <Route path="/leaderboard" element={<LeaderBoard />} />
                        <Route path="/add" element={<CreateQuestion />} />
                    </Route>

                    <Route path="*" element={<Error404/>} />
                </Routes>
            </div>
        </Fragment>
    );
}

const mapStateToProps = ({ authedUser }) => ({
    loading: authedUser === null,
})

export default connect(mapStateToProps)(App);
