import React from 'react';

import seven from '../../assets/images/7.png';
import twobar from '../../assets/images/2xBAR.png';
import threebar from '../../assets/images/3xBAR.png';
import bar from '../../assets/images/BAR.png';
import cherry from '../../assets/images/Cherry.png';

//global variables for animation
var timeout;
var g;
var fps = 30;

//define pictures
const pics = [
  threebar,
  bar,
  twobar,
  seven,
  cherry
];

class Reel extends React.Component {

  constructor(props) {
    super(props);
    //initial index to start from
    const idxStart = this.props.idxStart;
    //set states
    this.state = {
      index: idxStart,
      next: this.getNextIndex(idxStart),
      prev: this.getPrevIndex(idxStart),
      move: false,
    };
    var { changeState} = this.props;
  }

  componentDidMount(){
    console.log(this.props);
  }

  //get next item
  getNextIndex(idx) {
    if (idx >= pics.length - 1) {
      return 0;
    }
    return idx + 1;
  }

  //get previous item
  getPrevIndex(idx) {
    if (idx <= 0){
      return pics.length - 1;
    }
    return idx - 1;
  }

  //set initial index
  setIndexes(idx) {
    this.setState({
      index: idx,
      next: this.getNextIndex(idx),
      prev: this.getPrevIndex(idx)
    });
  }

  //spin for specific time and stop on item.
  stopAtElement = (id) => {

    //start spinning animation
    this.startAnimation();

    //stop it after a given time
    setTimeout(() => {

      //set final state
      this.setState({
        index: id,
        next: this.getNextIndex(id),
        prev: this.getPrevIndex(id)
      })

    }, this.props.time);    
  }

  performAnimation = (e) => {
    //set timeout for frame rate
    timeout = setTimeout(() => {

      //enable move state to start moving using css tag
      this.setState({
        move: true
      });

      if(this.props.time == 3000){
        this.props.setMoveInAppState(this.state.move);
      }
      //set the index
      this.setIndexes(this.getNextIndex(this.state.index));

      //request animation Frame to repeat the process
      g = requestAnimationFrame(this.performAnimation);

    }, 1000/fps);
  }

  //start the actual animation
  startAnimation = () => {
    //this.props.setMoveInAppState(1);

    //start animation
    this.performAnimation();

    //stop animation after given time
    setTimeout(() => {

      //cancel animation
      cancelAnimationFrame(g);
      //clear the timeout
      clearTimeout(timeout);

      //set state back to false to stop css transition
      this.setState({
        move: false
      })

      //change a
      if(this.props.time == 3000){
        this.props.setMoveInAppState(this.state.move);
      }

    }, this.props.time);
  }

  setMoveInReelState = (value) => {
    this.setState({ ...this.state, move: value });
    this.props.setMoveInAppState(value);
  };

    render() {
      const move = this.state.move ? 'move' : '';

      return (
        <div className="pic-wrapper">
          <div className={`prev pic ${move}`}>
            {this.state.prev}
            <img src={pics[this.state.prev]} alt=""/>
          </div>
          <div className={`current pic ${move}`} style={{background: 'lightblue'}}>
            {this.state.index}
            <img src={pics[this.state.index]} alt="" />
          </div>
          <div className={`next pic ${move}`}>
            {this.state.next}
            <img src={pics[this.state.next]} alt="" />
          </div>
        </div>
      );
    }
}

export default Reel;