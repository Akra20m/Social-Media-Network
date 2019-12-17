import React from 'react';
import Login from './Login';
import Register from './Register';
import '../style.css';


class Main extends React.Component {

    render(){
        return (
            <div className="test cover_page" id="main_background">
                <div id="main_container">
                    <Login/>
                    <Register/>
                </div>
            </div>
        );
    }
}

export default Main