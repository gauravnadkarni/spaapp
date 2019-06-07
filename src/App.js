import React from 'react';
import RegisterBox from './user/RegisterBox';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginBox from './user/LoginBox';

class App extends React.Component {
    render() {
        return (<div>
            <Router>
                <Switch>
                    <Route exact path="/" component={RegisterBox} />
                    <Route path="/login" component={LoginBox}  />
                </Switch>
            </Router>
        </div>
        );
    }
}

export default App 
