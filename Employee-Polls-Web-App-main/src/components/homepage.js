import { connect } from 'react-redux';
import DoneQuestion from './doneQuestions';
import NewQuestion from './newQuestions';
import { useLocation, useNavigate, useParams, Navigate } from 'react-router-dom';

const withRouter = (Component) => {
    const ComponentWithRouterProp = (props) => {
        let location = useLocation(); 
        let navigate = useNavigate(); 
        let params = useParams(); 
        return <Component {...props} router={{location, navigate, params}}/>;
    };
    return ComponentWithRouterProp;
}

const Homepage = (props) => {
    return (
        <div className='center'>
            <NewQuestion id={props.id} />
            <DoneQuestion id={props.id} /> 

        </div>
    );
}

const mapStateToProps = ({ authedUser, questions, users }, props) => {
    const {id} = props.router.params;

    return {
        id,
        authedUser,
    }
       
}

export default withRouter(connect(mapStateToProps)(Homepage)); 

//what does this component need from the state of our redux store? 
//setAuthUser ( who's account it is )
//questions unanswered
//questions answered 