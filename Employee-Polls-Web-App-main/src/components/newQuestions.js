import { connect } from 'react-redux';
import QuestionList from './questionList';
import { useNavigate } from 'react-router-dom';

const NewQuestion = (props) => {
    const navigate = useNavigate();
    const handleQuestionClick = (id) => {
        navigate(`/questions/${id}`);
    };

    const { questions } = props;
    return <QuestionList title="New Questions" questions={questions} onQuestionClick={handleQuestionClick} />;
};

const mapStateToProps = ({authedUser, users, questions}, { id }) => {
    const user = users[authedUser];
    console.log(user)

    if (!user) {
        // Handle the case where the user doesn't exist
        return { questions: [] };
    }

    const answeredQuestions = new Set(Object.keys(user.answers));
    const unansweredQuestions = Object.keys(questions)
        .filter(questionId => !answeredQuestions.has(questionId)) // ensures question is unanswered
        .map(questionId => {
            const question = questions[questionId];
            return {
                id: question.id,
                author: question.author,
                timestamp: question.timestamp, // keep the original timestamp for sorting
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
        questions: unansweredQuestions
    };
}

export default connect(mapStateToProps)(NewQuestion);