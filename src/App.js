import React from 'react';
import './App.css';
import {Row, Col, Container, Button, Form, Modal } from 'react-bootstrap';
import Reel from './components/Reel/reel';
import wintable from './wintable';
import reelStack from './reelStack';

class App extends React.Component {

  
  constructor(props) {
    super(props);
    const idxStart = 0;    

    this.reel1 = React.createRef();
    this.reel2 = React.createRef();
    this.reel3 = React.createRef();

    this.state = {
      moving: false,
      balance: 1000,
      paytable: '',
      blinking: false,
      center1: 0,
      center2: 0,
      center3: 0,
      debug1: 4,
      debug2: 6, 
      debug3: 8,
      showModal: false
    }

    this.setMoveInAppState = this.setMoveInAppState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.onBalanceChange = this.onBalanceChange.bind(this);
  }
  

  //return random value between 0 and 4
  getRandomNr() {
    return Math.floor(Math.random() * 13);
  }
 
  //Start the spinning and stop on specified parameter value
  startReel = (c1, c2, c3) => {

    //update state
    this.setState({
      center1: c1,
      center2: c2,
      center3: c3,
      balance: this.state.balance - 1
    })

    //start spin
    this.reel1.current.stopAtElement(c1);
    this.reel2.current.stopAtElement(c2);
    this.reel3.current.stopAtElement(c3);

    //after 3 secs show if won
    setTimeout(() => {
      //check if center upper or lower has won
      if(this.checkCenterWin(c1,c2,c3) || this.checkUpperWin(c1,c2,c3) || this.checkLowerWin(c1,c2,c3)){
        //prize variable
        var prize = 0;

        //check how much is won on center line
        if(this.checkCenterWin(c1,c2,c3)){
          prize += this.getCenterPrize(c1);
        }

        //check how much is won on upper line with cherry special condition
        if(this.checkUpperWin(c1,c2,c3)){
          if(reelStack[this.reel1.current.getPrevIndex(c1)] === 'cherry'){
            prize += 2000
          } else {
            prize += this.getUpperPrize(c1);
          }
        }

        //check how much is won on lower line with cherry special condition
        if(this.checkLowerWin(c1,c2,c3)){
          if(reelStack[this.reel1.current.getNextIndex(c1)] === 'cherry'){
            prize += 4000;
          } else {
            prize += this.getLowerPrize(c1);
          }
        }

        //change the states
        this.setState({
          balance: this.state.balance + prize,
        });

        this.blinkingPaytable('YOU WON: ' + prize + ' 💵📈🤑');

      } else {
        
        this.blinkingPaytable('No Luck 😞');
      }
    }, 3000)
  };

  //check if center match
  checkCenterWin = (center1, center2, center3) => {
    if(reelStack[center1] === reelStack[center2] && reelStack[center2] == reelStack[center3]){
      return true;
    } else {
      return false;
    }
  }

  //check id upper row match
  checkUpperWin = (center1, center2, center3) => {
    if(reelStack[this.reel1.current.getPrevIndex(center1)] === reelStack[this.reel2.current.getPrevIndex(center2)] && reelStack[this.reel2.current.getPrevIndex(center2)] == reelStack[this.reel3.current.getPrevIndex(center3)]){
      return true;
    } else {
      return false;
    }
  }

  //check id lower row match
  checkLowerWin = (center1, center2, center3) => {
    if(reelStack[this.reel1.current.getNextIndex(center1)] === reelStack[this.reel2.current.getNextIndex(center2)] && reelStack[this.reel2.current.getNextIndex(center2)] == reelStack[this.reel3.current.getNextIndex(center3)]){
      return true;
    } else {
      return false;
    }
  }

  //Creates random values and returns 3 random non repetive values to avoid 3 line win!
  getNonRepetitiveRandomNumbers(){
    var firstNumber = Math.floor(Math.random() * 21);
    var secondNumber = Math.floor(Math.random() * 21);
    var thirdNumber = Math.floor(Math.random() * 21);
    var differentNumber = false;

    while(!differentNumber){
        if(secondNumber == thirdNumber){
          thirdNumber = Math.floor(Math.random() * 21);
        }
        else{
          differentNumber = true;
        }
    }
    return [firstNumber, secondNumber, thirdNumber]
  }

  //Starts regular random reel spin
  startRegReel = () => {
    var randomNumberArr = this.getNonRepetitiveRandomNumbers()
    this.startReel(randomNumberArr[0], randomNumberArr[1], randomNumberArr[2]);
  }

  //return winning value
  getCenterPrize(winVal) {
    return wintable[winVal];
  }

  //upper row winning price
  getUpperPrize(winVal){
    return wintable[this.reel1.current.getPrevIndex(winVal)];
  }

  //get lower row winning price
  getLowerPrize(winVal){
    return wintable[this.reel1.current.getNextIndex(winVal)];
  }

  //blink text for 3 seconds if won
  blinkingPaytable(prize){

    this.setState({
      blinking: true,
      paytable: prize
    });

    setTimeout(() => {
      this.setState({ 
        blinking: false,
        paytable: ''
      });
    }, 3000);
  }

  //get moving state from child
  setMoveInAppState = (value) => {
    this.setState({ ...this.state, moving: value });
  };

  
  //handles change
  handleChange = (e) => {
    const re = /^([0-1]?[0-9]|20)$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      this.setState({debug3: e.target.value})
    } 
  }

  //handles change
  handleChange1 = (e) => {
    const re = /^([0-1]?[0-9]|20)$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      this.setState({debug2: e.target.value})
    } 
  }

  //handles change
  handleChange2 = (e) => {
    const re = /^([0-1]?[0-9]|20)$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      this.setState({debug1: e.target.value})
    } 
  }

  //Debug form submit
  handleSubmit = (event) => {
    this.startReel(parseInt(this.state.debug1), parseInt(this.state.debug2), parseInt(this.state.debug3));
    event.preventDefault();
  }

  //allow value between 1-5000 only
  onBalanceChange = (e) => {
    const re = /^(?:[1-9]|\d{2,3}|[1-4]\d{3}|5000)$/;
    
    if (e.target.value === '' || re.test(e.target.value)) {
       this.setState({balance: e.target.value})
    } 
  }

  handleShow = () => {
    this.setState({
      showModal: true
    })
  }

  handleClose = () => {
    this.setState({
      showModal: false
    })
  }

  render(){
    const blinking = this.state.blinking ? 'blink_me' : '';
    const moving = this.state.moving;
    const balance = this.state.balance;
    let regularspin;
    let debugspin;

    if(moving === false && balance !== 0){
      regularspin = <Button className='spinbtn white' variant="success" onClick={this.startRegReel}>Spin</Button>
      debugspin = <Button className='spinbtn white' type='submit' variant="success">SPIN</Button>
    }else if(moving === true){
      regularspin = <h3 className='spinbtn white'>Spinning...</h3>
      debugspin = <h3 className='spinbtn white'>Spinning...</h3>
    } else if(moving === false && balance === 0){
      regularspin = <h3 claseName='spinbtn white' style={{color: 'white'}}>Please deposit some money 💵</h3>
      debugspin = <h3 className='spinbtn white'>Make deposit first</h3>
    }

    return (
      <div className="App">
        <br></br>
        <h1 className="white">Slot Machine</h1>
          <br></br>
          <Container>
            <Row className="justify-content-md-center">
              <Col xs lg="1" align='center'>
                <Reel
                  idxStart={1}
                  time={2000}
                  ref={this.reel3}
                  setMoveInAppState={this.setMoveInAppState}
                />
              </Col>
              <Col xs lg="1" align='center'>
                <Reel
                  idxStart={3}
                  time={2500}
                  ref={this.reel2}
                  setMoveInAppState={this.setMoveInAppState}
                />
              </Col>
              <Col xs lg="1" align='center'>
                <Reel
                  idxStart={0}
                  time={3000}
                  ref={this.reel1}
                  setMoveInAppState={this.setMoveInAppState}
                />
              </Col>
            </Row>
          </Container>
          {regularspin}
          <Container>
            <Row className="justify-content-md-center">
              <Col>
                <h1 className="white">Balance</h1>
                <Form.Control value={this.state.balance} onChange={this.onBalanceChange}/>
              </Col>
              <Col>
                <h1 className="white">Pay table</h1>
                <h3 className={`${blinking}`}>{this.state.paytable}</h3>
              </Col>
              <Col>
                <h1 className="white">Debug</h1>
                <Button variant="primary" onClick={this.handleShow}>
                  Reel Table
                </Button>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Label className="white">Insert combination for center line:</Form.Label>
                  <Form.Control type="number" value={this.state.debug3} onChange={this.handleChange}/>
                  <Form.Control type="number" value={this.state.debug2} onChange={this.handleChange1}/>
                  <Form.Control type="number" value={this.state.debug1} onChange={this.handleChange2}/>
                  {debugspin}
                </Form>
              </Col>
            </Row>

            <Modal show={this.state.showModal} onHide={this.handleClose} animation={false}>
              <Modal.Header closeButton>
                <Modal.Title>Reel Order</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Higher probability on lower wins and vice versa. There is 2xCherry, 3xSeven, 4xThreebar, 5xTwobar, 6xBar</p>
                <ul>
                  <li>0: threebar</li>
                  <li>1: bar</li>
                  <li>2: threebar</li>
                  <li>3: bar</li>
                  <li>4: twobar</li>
                  <li>5: seven</li>
                  <li>6: twobar</li>
                  <li>7: cherry</li>
                  <li>8: twobar</li>
                  <li>9: threebar</li>
                  <li>10: seven</li>
                  <li>11: bar</li>
                  <li>12: bar</li>
                  <li>13: seven</li>
                  <li>14: cherry</li>
                  <li>15: bar</li>
                  <li>16: twobar</li>
                  <li>17: threebar</li>
                  <li>18: twobar</li>
                  <li>19: twobar</li>
                  <li>20: bar</li>
                </ul>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </Container>
      </div>
    );
  }
}

export default App;
