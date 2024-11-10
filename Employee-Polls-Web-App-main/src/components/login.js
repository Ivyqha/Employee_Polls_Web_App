import {connect} from 'react-redux';    
import {useState} from 'react';
// import {loginUser} from '../actions/authedUser';
import {setAuthedUser} from '../actions/authedUser';
import {useNavigate, useLocation} from 'react-router-dom';


const Login = (props) => {
    const { users } = props;
    const[select, setSelect] = useState('')
    const navigate = useNavigate();
    const location = useLocation();

    const { from = { pathname: '/' } } = location.state || {};

    const handleSelectChange = (e) => {
        e.preventDefault();
        setSelect(e.target.value)
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        if (select) {
            await props.dispatch(setAuthedUser(select));
            navigate(from.pathname);
          }
    }

    return (
        <div className='login-page'>
            <div className='center login-container'>
                <h1 className='login-title'>Welcome to the Would You Rather App!</h1>
                <p className='login-subtext' >Please sign in to continue</p>
                <select className='login-select' onChange={(e) => handleSelectChange(e)} data-testid='user-select'>
                    <option className='option-select'value=''>Select User</option>
                    {
                        Object.keys(users).map((user) => (
                            <option className='option-select' key={user} value={user}>{users[user].name}</option>
                        ))
                    }
                </select>
                <button className='btn poll' onClick={handleLogin}>Sign In</button>
            </div>
        </div>
      
    );
}

const mapStateToProps = ({ authedUser, users = {} }) => {
    return {
        authedUser,
        users
    };
}; 

export default connect(mapStateToProps)(Login);