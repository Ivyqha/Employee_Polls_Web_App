import {getInitialData} from '../apis';
import {receiveUsers} from './users';
import {receiveQuestions} from './pollQuestions';
// import {loginUser} from './authedUser';
import { setAuthedUser } from './authedUser';

const authedId = 'mtsamis';

export function handleInitialData (authedId) {
    return (dispatch) => {
        return getInitialData()
            .then(({users, questions}) => {
                dispatch(receiveUsers(users))
                dispatch(receiveQuestions(questions))
                if (authedId) {
                    dispatch(setAuthedUser(authedId))
                }

            })
    }
}