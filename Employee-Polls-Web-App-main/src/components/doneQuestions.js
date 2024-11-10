import { connect } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import QuestionList from './questionList';

const DoneQuestion = (props) => {
    const navigate = useNavigate();
    const { questions } = props;

    const handleQuestionClick = (id) => {
        navigate(`/questions/${id}`);
    };

    return <QuestionList title="Completed Questions" questions={questions} onQuestionClick={handleQuestionClick} />;
}

const mapStateToProps = ({authedUser, users, questions}, { id }) => {
    const user = users[authedUser];

    if (!user) {
        // Handle the case where the user doesn't exist
        return { questions: [] };
    }

    const answeredQuestions = Object.keys(user.answers)
        .filter(questionId => questions[questionId]) // ensures question exists
        .map(questionId => {
            const question = questions[questionId];
            return {
                id: question.id,
                author: question.author,
                timestamp: question.timestamp,
                formattedTimestamp: new Date(question.timestamp).toLocaleDateString('en-GB', { 
                    day: '2-digit', 
                    month: '2-digit', 
                    year: '2-digit'
                }) + ' ' + new Date(question.timestamp).toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: 'numeric', 
                    hour12: true 
                }),
            }
        })
        .sort((a, b) => b.timestamp - a.timestamp); 


    return {
        authedUser,
        questions: answeredQuestions,
    };
}

export default connect(mapStateToProps)(DoneQuestion);