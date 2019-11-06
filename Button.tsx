import ReactDOM from "react-dom";
import { Subutton } from "./Subutton";
import { QuestionEntry } from "./QuestionEntry";
import React from "react";



export class Button extends React.Component<{color: string, entry: QuestionEntry, mergeHandler:(q:QuestionEntry)=>void}, {texts: string[], color: boolean, colors: string, mergeState: string, entryquest: string}> {
    constructor(props: {color: string, entry: QuestionEntry,mergeHandler:(q:QuestionEntry)=>void}){
    super(props);  
    this.state = {
        texts: [],
        color: false,
        colors: "white",
        mergeState: "Unadded",
        entryquest: ""
      }
  }

  
  Submitfunc = (val: string)=> {
    let vals = this.state.texts;
    vals.push(val)
    this.setState({texts: vals})
  }
    changeColor(e: any){
      console.log("This was called - changecolor");
      this.props.mergeHandler(this.props.entry)
      if(this.state.color === false){
         return (this.setState({color: !this.state.color, colors: "green", mergeState: "Add", entryquest: this.props.entry.question}),
            this.Submitfunc(this.props.entry.question))
      }else if (this.state.color === true){
        this.setState({color: !this.state.color, colors: "white", mergeState: "Unadded", entryquest: this.props.entry.question})
  
      }
      

    }
        render(){
        let bgColor = this.state.color ? "white" : this.props.color
        return (
            <button color = {bgColor} style={{backgroundColor: this.state.colors}} onClick={()=>{this.changeColor(undefined)}}>{this.state.mergeState}</button>
      )
    }
  }
  


  