import React, { Component } from 'react';
import './App.css';
import WebFont from 'webfontloader';
import Grid from '@material-ui/core/Grid';
import BottomBar from "./components/BottomBar";
import { Container } from '@material-ui/core';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from "./Routes";

class App extends Component {
  componentDidMount() {
    WebFont.load({
      google: {
        families: ['Roboto Mono', 'Material+Icons']
      }
    });
  }
  render() {
    return (
      <div >
        <Router>
          <Container
            style={{ height: '100vh' }}>
            <Grid >
              <div style={{paddingleft:'10px',paddingRight:'10px', paddingBottom: '60px'}}>
                <Routes/>
              </div>
              </Grid>

            <div style={{ position: 'fixed', bottom: '0px', left: '0px', width: '100%' }}>
              <BottomBar />
            </div>
          </Container>
        </Router>
      </div>
    );
  }
}

export default App;
