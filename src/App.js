import React from 'react';
import './App.css';
import {Row, Col, Container, Button } from 'react-bootstrap';
import Reel from './components/Reel/reel';
import wintable from './wintable';

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
      val1: '',
      val2: '',
      val3: '',
      center1: 0,
      center2: 0,
      center3: 0
    }

    this.setMoveInAppState = this.setMoveInAppState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onBalanceChange = this.onBalanceChange.bind(this);

  }

  //return random value between 0 and 4
  getRandomNr() {
    return Math.floor(Math.random() * 5);
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
      //if all 3 reels match
      if(c1 == c3 && c1 == c2){

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

  handleSubmit = (event) => {
    //alert('A name was submitted: ' + this.state.val1);
    this.startReel(this.state.val1, this.state.val1, this.state.val1);
    event.preventDefault();
  }

  handleChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
    console.log('ev: ' + [event.target.name])
  }

  onBalanceChange = (e) => {
    //const re = /^([1-9][0-9]{0,2}|5000)$/;

    // if value is not blank, then test the regex

    //if (e.target.value === '' ){//|| re.test(e.target.value)) {
       this.setState({balance: e.target.value})
    //}
  }

  render(){
    const blinking = this.state.blinking ? 'blink_me' : '';
    const moving = this.state.moving;
    const balance = this.state.balance;
    let btn;

    if(moving == false && balance != 0){
      btn = <Button className='spinbtn' variant="success" onClick={this.startRegReel}>Spin</Button>
    }else if(moving == true){
      btn = <h3 className='spinbtn'>Spinning...</h3>
    } else if(moving == false && balance === 0){
      btn = <h3 claseName='spinbtn'>Please deposit some money</h3>
    }

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
        {btn}
        <Container>
          <Row className="justify-content-md-center">
            <Col>
              <h1>Balance</h1>
              <input value={this.state.balance} onChange={this.onBalanceChange}/>
            </Col>
            <Col>
              <h1>Pay table</h1>
              <h3 className={`${blinking}`}>{this.state.paytable}</h3>
            </Col>
            <Col>
              <h1>Debug</h1>
              <p>Insert numbers 0 to 4 in each box. (0: 3xBAR, 1: 1xBAR, 2: 2xBAR, 3: 7 Seven, 4: Cherry)</p>
              <form onSubmit={this.handleSubmit}>
                <input name='n' type='number' value={this.state.val1} onChange={this.handleChange}/>
                <input name='b'type='number' value={this.state.val2} onChange={this.handleChange}/>
                <input name='a'type='number' value={this.state.val3} onChange={this.handleChange}/>
                <input type="submit" value="Submit" />
              </form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
