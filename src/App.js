import React from 'react';
import './App.css';
import {Row, Col, Container, Button } from 'react-bootstrap';
import Reel from './components/Reel/reel';

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
      val1: '',
      val2: '',
      val3: ''
    }

    this.setMoveInAppState = this.setMoveInAppState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }
 
  //Start the spinning and stop on specified parameter value
  startReel = () => {
    this.reel1.current.stopAtElement(4);
    this.reel2.current.stopAtElement(4);
    this.reel3.current.stopAtElement(4);
  };

  setMoveInAppState = (value) => {
    this.setState({ ...this.state, moving: value });
  };

  handleSubmit = (event) => {
    alert('A name was submitted: ' + this.state.val1);
    event.preventDefault();
  }

  handleChange = (event) => {
    this.setState({val1: event.target.value});
  }

  render(){
    const moving = this.state.moving
    let btn;

    if(moving == false){
      btn = <Button variant="success" onClick={this.startReel}>Spin</Button>

    }else{
      btn = <h1>Spinning...</h1>
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
              
            </Col>
            <Col>
              <h1>Debug</h1>
              <form onSubmit={this.handleSubmit}>
                <input type='text' value={this.state.val1} onChange={this.handlechange}/>
                <input type='text' value={this.state.val2} onChange={this.handlechange}/>
                <input type='text' value={this.state.val3} onChange={this.handlechange}/>
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
