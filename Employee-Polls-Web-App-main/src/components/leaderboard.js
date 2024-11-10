import {connect} from 'react-redux';
import { createSelector } from 'reselect';

const getUsers = (state) => state.users;

const getSortedUsers = createSelector(
  [getUsers],
  (users) => {
    return Object.keys(users).map((key) => {
      const user = users[key]; 
      return {
          id: user.id,
          name: user.name,
          avatarURL: user.avatarURL,
          answeredQuestions: Object.keys(user.answers).length,
          createdQuestions: user.questions.length, 
          score: Object.keys(user.answers).length + user.questions.length
      }
    }).sort((a, b) => b.score - a.score);
  }
);

const Leaderboard = (props) => {
    const {users} = props; 
    return (
        <div className='center'>
            <table className='leaderboard'>
                <thead className='table-head'>
                    <tr>
                        <th className='user-th'>Users</th>
                        <th className='answer-th'>Answered</th>
                        <th className='created-th'>Created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className='table-row'>
                            <td className='table-cell-1'>
                                <div className='user-cell'>
                                    <img src={user.avatarURL} alt='avatar' className='avatar-nav'/>
                                    <p>{user.name}</p>
                                </div>
                            </td>
                            <td className='table-cell-2'>
                                <p>{user.answeredQuestions}</p>
                            </td>
                            <td className='table-cell-2'>
                                <p>{user.createdQuestions}</p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
const mapStateToProps = (state, props) => {
    return {
      authedUser: state.authedUser,
      users: getSortedUsers(state)
    }
  }
  
  export default connect(mapStateToProps)(Leaderboard);

