import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Main from './Main';
import PostEdit from './PostEdit';
import Dashboard from './Dashboard';
import Profile from './Profile';
import '../style.css';


class App extends React.Component {

    render(){
        return (
        <div className="cover_page">
            <BrowserRouter>
                <div className="cover_page">
                    <Route path="/" exact component={Main}/>
                    <Route path="/dashboard" exact component={Dashboard}/>
                    <Route path="/posts/edit/:id" exact component={PostEdit}/>
                    <Route path="/profile" exact component={Profile}/>
                </div>
            </BrowserRouter>
        </div>
        );
    }
}

export default App