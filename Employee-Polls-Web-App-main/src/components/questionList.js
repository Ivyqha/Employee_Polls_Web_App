import '../App.css';

const QuestionList = ({ title, questions, onQuestionClick, }) => (
    <div className='question-container'>
        <h1 className='question-box-title'>{title}</h1>
        <div className='question-box'>
            {questions.map(question => (
                <li key={question.id} className='list'>
                    <div className='question-option'>
                        <p className='option-title'>{question.author}</p>
                        <p className='option-subtext'>{question.formattedTimestamp}</p>
                        <button type='button' className='btn' onClick={() => onQuestionClick(question.id)}>Show Question</button>
                    </div>      
                </li>
            ))}
        </div>
    </div>
);

export default QuestionList;
