import React from 'react';

import seven from '../../assets/images/7.png';
import twobar from '../../assets/images/2xBAR.png';
import threebar from '../../assets/images/3xBAR.png';
import bar from '../../assets/images/BAR.png';
import cherry from '../../assets/images/Cherry.png';

//interval variable for spinning
var interval;
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
  timeToSpin = (id) => {
    //this.setIndexes(id)
    this.spin();

    setTimeout(() => {
      this.stopSpin(id);
      
      //var random = fruits[Math.floor(Math.random()* fruits.length)];
      //this.stopShuffle();
      //document.getElementById('fruit1').innerHTML = random;
      //this.setState({
      //  fruit1: random
      //})
    }, this.props.time);    
  }

  //start spinning the reel using interval loop
  spin = () => {
    interval = setInterval(() => {
      // on
      this.setState({
        move: true
      });
      // off
      setTimeout(() => {
        this.setState({
          move: false
        });
        this.setIndexes(this.getNextIndex(this.state.index));
      }, 100); // same delay as in the css transition here
    }, 150);
    console.log("interval: " + interval);
  }

  stopSpin = (id) => {
    //clear interval of each reel
    setTimeout(() => {
      this.setIndexes(id);
      clearInterval(interval);
    }, 0)
      //this.setIndexes(id);
     // clearInterval(interval);
      setTimeout(() => {
        this.setIndexes(id);
        clearInterval(interval-2);
      }, 1000)
     // setTimeout(() => {
     //   clearInterval(interval-4)
    //  },2000)
      
      //clearInterval(interval-2);
      clearInterval(interval-4);
    
   
    console.log("interval: " + interval);
    console.log(this.state.index);
    console.log(this.state.next);
    console.log(this.state.prev);
    
  }

    render() {
      const move = this.state.move ? 'move' : '';

      return (
        <div className="pic-wrapper">
          <div className={`prev pic ${move}`}>
            {this.state.prev}
            <img src={pics[this.state.prev]} alt=""/>
          </div>
          <div className={`current pic ${move}`}>
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