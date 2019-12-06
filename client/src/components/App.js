import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Main from './Main';
import Dashboard from './Dashboard';

class App extends React.Component {

    render(){
        return (
        <div>
            <BrowserRouter>
                <div>
                    <Route path="/" exact component={Main}/>
                    <Route path="/dashboard" exact component={Dashboard}/>
                </div>
            </BrowserRouter>
        </div>
        );
    }
}

export default App