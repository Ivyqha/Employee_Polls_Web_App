import { Navigate,Outlet, useLocation} from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({authedUser, children, redirect = '/login'}) => {
  const location = useLocation(); 
  if (!authedUser) {
    return <Navigate to={redirect} replace state={{from : location }}/>;
  }
  return  <Outlet/>
};

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
});

export default connect(mapStateToProps)(PrivateRoute);