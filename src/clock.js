import React from 'react';
var circle;
var fill;
class clock extends React.Component{
  constructor(props){
    super(props);
    this.state={
      Session:this.props.Session,
      Break:this.props.Break,
      Seccond:0,
      currentAngel:0,
      type:"Working"
    }
   
    this.draw=this.draw.bind(this);
    this.trigger=this.trigger.bind(this);
    this.stop=this.stop.bind(this);
    this.reset=this.reset.bind(this);
  }

draw(){
      const canvas=this.refs.canvas;
      const can=canvas.getContext('2d');
      var poinTofill = 0;
      var minutes=this.props.Session;
      var second=0;
      var t=`${minutes}:${second}`;
      can.lineWidth = 6;
      can.fillStyle = "#fff";
      can.strokeStyle = "#edb4af";
      can.textAlign = "center";
      can.font = "25px Monospace";
      can.clearRect(0, 0, 300, 300);
      can.fillText(t, 150, 150);
      can.beginPath();
      can.arc(150, 150, 125, poinTofill, Math.PI*2, false)
      can.stroke();
}

trigger(){
    const canvas=this.refs.canvas;
    const can=canvas.getContext('2d');
    var no = this.state.currentAngel;
    var poinTofill = -Math.PI/2;
    var diff;
    var time;
    var minutes;
    if(this.state.type==="Working"){
      time=this.state.Session*60;
    minutes=this.state.Session;
    }else{
      time = this.state.Break* 60;
      minutes = this.state.Break;
    }
    var second=this.state.Seccond;

  fill=()=>{
    if(this.state.type==="Working"){
    this.setState({
      Session: minutes,
      Seccond: second,
      currentAngel: no
    });
  }else{
      this.setState({
        Break: minutes,
        Seccond: second,
        currentAngel: no
      });
  }
   diff = -Math.PI/2+((no / time) * Math.PI * 2);
   can.clearRect(0, 0, 300, 300);
   if(second===0){
         minutes=minutes-1;
         second=60;
         
   }
  
   var t=`${minutes}:${second}`;
   can.textAlign = "center";
   can.font = "25px Monspace";
   can.strokeStyle="#edb4af";
   can.beginPath();
   can.arc(150, 150, 125, poinTofill, Math.PI*2, false)
   can.stroke();

   can.fillText(this.state.type, 150, 100);
   can.fillText(t, 150, 150);
   can.lineWidth = 5;
   can.strokeStyle = "#fff";
   can.beginPath();
   can.arc(150, 150, 125, poinTofill, diff,false );
   can.stroke();
   can.save();
   
   ++no;
   --second;
    if (no === time) {
      clearInterval(fill);
      minutes = 0;
      second = 0;

      if (this.state.type === "Working") {
        this.setState({
          type: "Break",
          Seccond: 0,
          currentAngel: 0
        })
        clearInterval(circle);
        this.trigger();
      }
      else {
        clearInterval(circle);
        this.reset();
      }

    } 
  
 }
circle=setInterval(fill,1000);
 }

 stop(){
   clearInterval(circle);
 }
reset(){
  clearInterval(circle);
  this.setState({
    Seccond:0,
    currentAngel:0,
    type:"Working"
  });
  this.props.timereset();
}
  componentDidMount(){
    console.log("component Did mount");
      this.draw();
  }
  componentWillReceiveProps(newProps){
    this.setState({
        Session:newProps.Session,
        Break:newProps.Break
    })
  }
  componentDidUpdate(prevProps,prevState,snapshot){
    this.draw();
  }
 
  render(){
  return (
    <div>
    <canvas ref="canvas" width="300" height="300"></canvas>
    <div className="controler">
        <button ref="start" onClick={ this.trigger}>Start</button>
        <button id="stop" onClick={ this.stop } >Stop</button>
        <button id="reset" onClick={ this.reset }>Reset</button>
    </div>
    </div>
  )
}
}

export default clock;
