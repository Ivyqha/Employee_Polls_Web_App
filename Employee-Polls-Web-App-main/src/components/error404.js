import React from 'react';
import { connect } from 'react-redux'; 

const Error404 = ({authedUser}) => {

    return (
        <div className='center'>
            <h1>Error 404</h1>
            <p>Page not found</p>
        </div>
    );
}


export default Error404;