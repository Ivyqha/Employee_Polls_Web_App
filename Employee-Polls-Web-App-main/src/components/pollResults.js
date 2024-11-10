const PollResults = ({ togglePopup, optionOne, optionTwo, users }) => {
    return (
        <div className='popup'>
            <button className='close-btn' onClick={togglePopup}>X</button>
            <h2 className='popup-title'>Results:</h2>
            <div className='popup-content'>
                <div className='poll-result'>
                    <div className='poll-statistic'>
                        <h4>Votes: {optionOne.votes.length}</h4>
                        <h4>{Math.round((optionOne.votes.length / (optionOne.votes.length + optionTwo.votes.length)) * 100)}%</h4>
                    </div>
                    <h4>{optionOne.text.charAt(0).toUpperCase() + optionOne.text.slice(1)}</h4>
                    <ul>
                        {
                            optionOne.votes.map((vote) => (
                                <li key={vote}>{users[vote].name}</li>
                            ))
                        }
                    </ul>
                </div>
                <div className='poll-result'>
                    <div className='poll-statistic'>
                        <h4>Votes: {optionTwo.votes.length}</h4>
                        <h4>{Math.round((optionTwo.votes.length / (optionOne.votes.length + optionTwo.votes.length)) * 100)}%</h4>
                    </div>
                    <h4>{optionTwo.text.charAt(0).toUpperCase() + optionTwo.text.slice(1)}</h4>
                    <ul>
                        {
                            optionTwo.votes.map((vote) => (
                                <li key={vote}>{users[vote].name}</li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default PollResults;
