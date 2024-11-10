import { combineReducers } from 'redux';

import users from './users';
import questions from './pollQuestions';
import authedUser from './authedUser';

export default combineReducers({
    users,
    questions,
    authedUser, 
});