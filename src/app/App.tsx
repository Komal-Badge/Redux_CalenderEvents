import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { appStore } from "./store/AppStore";
import { Container } from "./components/container/Container";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./index.css"
import { default as AddEvent } from './components/addEvent/AddEvent';
ReactDOM.render(
    <Provider store={appStore}>
        <Router>
            <div>
                <Route exact path="/" component={Container} />
                <Route path="/addEvent" component={AddEvent} />
            </div>
        </Router>
    </Provider>,
    document.getElementById('root') as HTMLElement
);