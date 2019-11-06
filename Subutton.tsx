import React from "react";
import { QuestionEntry } from "./QuestionEntry";
import {MergeQuestions} from './API_Interface'
export class Subutton extends React.Component<{questions: QuestionEntry[],api_url:string}>{
    constructor(props:{questions: QuestionEntry[],api_url:string}){
        super(props);
        // this.handleQuestionSubmitChange = this.handleQuestionSubmitChange.bind(this)
    }
    doCommit():void{
        MergeQuestions(this.props.api_url,this.props.questions.map((q)=>q._id))
        let arr = []
        let i = 0;
        /*while(i < 10){
        arr.push(this.props.questions[i].question)
           i++;
        }
        alert(arr)
        */
    }
    render(){
      return <button onClick={this.doCommit.bind(this)} name={`Merge ${this.props.questions.length} questions`}>merge</button>
    }

}



  