import React, { Component } from 'react'
import { Switch, Route} from 'react-router-dom';
import HomeScreen from "./screens/HomeScreen";
export default class Routes extends Component {
    render() {
        return (
            <div>
               
                    
                        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                        <Switch>
                            <Route path="/home">
                                <HomeScreen />
                            </Route>
                            <Route path="/">
                                <HomeScreen />
                            </Route>
                        </Switch>
                    
            </div>
        )
    }
}
