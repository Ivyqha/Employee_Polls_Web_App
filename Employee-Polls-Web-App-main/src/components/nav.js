import {Link} from 'react-router-dom';
import ProfileNav from './profileNav';

const Nav = (props) => {
    return (
        <nav className='nav'>
            <ul className='nav-list'>
                <li>
                    <Link to='/'  className='nav-option'>Home</Link>
                </li>
                <li>
                    <Link to='/add' className='nav-option'>New</Link>
                </li>
                <li>
                    <Link to='/leaderboard'  className='nav-option'>Leaderboard</Link>
                </li>
            </ul>
            <ProfileNav/>
        </nav>
    )
}

export default Nav;
