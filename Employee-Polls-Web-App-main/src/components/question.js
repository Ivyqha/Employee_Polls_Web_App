import {connect} from 'react-redux';
import React, {useState} from 'react';
import Error404 from './error404';
import { handleSaveAnswer } from '../actions/pollQuestions';
import PollResults from './pollResults';
import { useLocation, useNavigate, useParams} from 'react-router-dom';


const withRouter = (Component) => {
    const ComponentWithRouterProp = (props) => {
        let location = useLocation(); 
        let navigate = useNavigate(); 
        let params = useParams(); 
        return <Component {...props} router={{location, navigate, params}}/>;
    };
    return ComponentWithRouterProp;
}

const Question = (props) => {
    const {question, users, authedUser} = props; 
    const [showPoll, setShowPoll] = useState(false);

    if (!question) {
        return <Error404 />
    }

    if(!authedUser === null){
        return <Error404/>
    }

    const handleSelect = (e, option) => {
        e.preventDefault();
        const { dispatch, question, authedUser } = props; 
        dispatch(handleSaveAnswer({
            authedUser,
            qid: question.id,
            answer: option
        }));
    };

    const togglePopup = () => {
        setShowPoll(!showPoll);
    }

    const {id, optionOne, optionTwo, author } = question;
    const user = props.users[author];

    return (
        <div key={id}>
            <h1 className='question-box-title'>{user.name} asks:</h1>
            <div>
                <div className='poll-container center'>
                    <img src={user.avatarURL} alt={`Avatar of ${user.name}`} className='avatar'/>
                    <h2>Would You Rather</h2>
                    {
                        users[authedUser].answers.hasOwnProperty(id) === true && (
                            <button type='button' className='btn poll' onClick={togglePopup}>View Poll</button>
                        )
                    }
                    {
                        showPoll && (
                           <PollResults togglePopup={togglePopup} optionOne={optionOne} optionTwo={optionTwo} users={users} />
                        )
                    }
                    <div className="poll-questions">
                        <div className={`poll-option ${users[authedUser].answers[id] === 'optionOne' ? 'selected-option' : ''}`}>
                            <p className='poll-text'>{optionOne.text.charAt(0).toUpperCase() + optionOne.text.slice(1)}</p>
                            {
                                users[authedUser].answers.hasOwnProperty(id) === true
                                ? <h4>Votes: {optionOne.votes.length}</h4>
                                : null
                            }
                            {
                                users[authedUser].answers.hasOwnProperty(id) === false && (
                                    <div className='poll-select'>
                                        <button type='button' className='btn' onClick={(e) => handleSelect(e, 'optionOne')} >Option One</button>
                                    </div>
                                )
                            } 
                        </div>
                        <div className={`poll-option ${users[authedUser].answers[id] === 'optionTwo' ? 'selected-option' : ''}`}>
                            <p className='poll-text'>{optionTwo.text.charAt(0).toUpperCase() + optionTwo.text.slice(1)}</p>
                            {
                                users[authedUser].answers.hasOwnProperty(id) === true
                                ? <h4>Votes: {optionTwo.votes.length}</h4>
                                : null
                            }
                            {
                                users[authedUser].answers.hasOwnProperty(id) === false && (
                                    <div className='poll-select'>
                                        <button type='button' className='btn' onClick={(e) => handleSelect(e, 'optionTwo')} >Option Two</button>
                                    </div>
                                )
                            }
                        </div>
                    </div>    
                </div>
            </div>
        </div>
    );
};


const mapStateToProps = ({authedUser, users, questions}, props) => {
    const {id} = props.router.params;
    const question = questions[id];

    return {
        authedUser, 
        users,
        question,
    };
};

export default withRouter(connect(mapStateToProps)(Question));