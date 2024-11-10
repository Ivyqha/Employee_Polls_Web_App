import { saveQuestion, saveQuestionAnswer} from '../apis';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const SAVE_ANSWER = 'SAVE_ANSWER';

function saveAnswer ({authedUser, qid, answer}) {
    return {
        type: SAVE_ANSWER,
        authedUser,
        qid,
        answer,
    };
}

//ascynchronous action creator/invokes saving the answer
export function handleSaveAnswer (info) {
    return (dispatch) => {
        dispatch(saveAnswer(info));

        return saveQuestionAnswer(info)
        .catch((e) => {
            console.warn('Error in handleSaveAnswer:', e);
            dispatch(saveAnswer(info));
            alert('There was an error saving the answer. Try again.');
        });
    };
};


function addQuestion (question) {
    return {
        type: ADD_QUESTION,
        question,
    };

};

//ascynchronous action creator
export function handleAddQuestion (optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const { authedUser } = getState();
        console.log('authedUser',authedUser)

        return saveQuestion({
            author: authedUser,
            optionOneText,
            optionTwoText,
        })
        .then((question) => {
            dispatch(addQuestion(question));
        })
        .catch((error) => {
            console.warn('Error in handleAddQuestion: ', error);
            alert('There was an error adding the question. Try again.');
        });
    }
}


export function receiveQuestions (questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    };
};
