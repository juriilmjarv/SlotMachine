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

    var a = reelStack[c1]
    var b = reelStack[c2]
    var c = reelStack[c3]

    //after 3 secs show if won
    setTimeout(() => {
      //if all 3 reels match
      //if(c1 === c3 && c1 === c2){
        if(a === b && b == c){

        //check how much is won
        var prize = this.checkWinningCombo(c1);

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

  //Starts regular random reel spin
  startRegReel = () => {
    var val1 = this.getRandomNr()
    var val2 = this.getRandomNr()
    var val3 = this.getRandomNr()
    this.startReel(val1, val2, val3);
  }

  //return winning value
  checkWinningCombo(winVal) {
    var winPrice = wintable[winVal];
    return winPrice;
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
    const re = /^([0-9]|1[0-2])$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      this.setState({debug3: e.target.value})
    } 
  }

  //handles change
  handleChange1 = (e) => {
    const re = /^([0-9]|1[0-2])$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      this.setState({debug2: e.target.value})
    } 
  }

  //handles change
  handleChange2 = (e) => {
    const re = /^([0-9]|1[0-2])$/;
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
                  <Form.Label className="white">Insert combination for center win:</Form.Label>
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
                <p>Higher probability on lower wins and vice versa.</p>
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
