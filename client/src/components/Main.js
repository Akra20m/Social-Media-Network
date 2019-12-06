import React from 'react';
import Login from './Login';
import Register from './Register';

class Main extends React.Component {

    render(){
        return (
            <div>
                <Login/>
                <Register/>
            </div>
        );
    }
}

export default Main