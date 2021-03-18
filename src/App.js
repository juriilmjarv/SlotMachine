import React from 'react';
import './App.css';
import {Row, Col, Container, Jumbotron } from 'react-bootstrap';
import Reel from './components/Reel/reel';

class App extends React.Component {

  
  constructor(props) {
    super(props);
    const idxStart = 0;    

    // get ref of dic onn which elements will roll
    //this.slotRef = [React.createRef(), React.createRef(), React.createRef()];
    this.reel1 = React.createRef();
    this.reel2 = React.createRef();
    this.reel3 = React.createRef();
  }
 
  /*
  spin = () => {
    this.startShuffle();

    setTimeout(() => {
      var random = fruits[Math.floor(Math.random()* fruits.length)];
      this.stopShuffle();
      document.getElementById('fruit1').innerHTML = random;
      this.setState({
        fruit1: random
      })
    }, 2000);    
  }

  startShuffle = () => {
    var count = 0;
    interval = setInterval(() => {
      document.getElementById('fruit1').innerHTML = fruits[count++];
      document.getElementById('fruit2').innerHTML = fruits[count++];
      if(count === fruits.length){
        count =0;
      } 
    },300)
  }

  stopShuffle = () => {
    clearInterval(interval);
  }
 */
  startReel = () => {
    this.reel1.current.timeToSpin(0);
    this.reel2.current.timeToSpin(0);
    this.reel3.current.timeToSpin(0);
  };

  stop = () => {
    this.reel1.current.stopSpin();
    this.reel2.current.stopSpin();
    this.reel3.current.stopSpin();
  }

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
                ref={this.reel1}
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
              ref={this.reel3}
            />
          </Col>
        </Row>
        </Container>
        <button onClick={this.startReel}>Spin</button>
        <button onClick={this.stop}>Reset</button>

      </div>
    );
  }
}

export default App;
