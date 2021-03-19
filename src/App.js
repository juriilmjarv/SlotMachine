import React from 'react';
import './App.css';
import {Row, Col, Container, Jumbotron } from 'react-bootstrap';
import Reel from './components/Reel/reel';

class App extends React.Component {

  
  constructor(props) {
    super(props);
    const idxStart = 0;    

    this.reel1 = React.createRef();
    this.reel2 = React.createRef();
    this.reel3 = React.createRef();

    this.state = {
      moving: false
    }
  }
 
  //Start the spinning and stop on specified parameter value
  startReel = () => {
    this.reel1.current.stopAtElement(4);
    this.reel2.current.stopAtElement(4);
    this.reel3.current.stopAtElement(4);
  };

  render(){

    return (
      <div className="App">
        <h1>Slot Machine</h1>

        <Container>
          <Row className="justify-content-md-center">
            <Col xs lg="1" align='center'>
              <Reel
                idxStart={1}
                time={2000}
                ref={this.reel3}
              />
            </Col>
            <Col xs lg="1" align='center'>
              <Reel
                idxStart={3}
                time={2500}
                ref={this.reel2}
              />
            </Col>
            <Col xs lg="1" align='center'>
              <Reel
                idxStart={0}
                time={3000}
                ref={this.reel1}
              />
            </Col>
          </Row>
        </Container>
        <button onClick={this.startReel}>Spin</button>
      </div>
    );
  }
}

export default App;
