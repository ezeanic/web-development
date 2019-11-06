import { UpButton, DownButton } from "./App";
import { Button } from "./Button";
import { QuestionEntry } from "./QuestionEntry";
import React from "react";

export class SimpleTable extends React.Component <{filterText:string, entries:QuestionEntry[], showArchivedQuestions?:boolean, 
        clickHandler?:(e:any)=>void,userIsAdmin?:boolean,archiveHandler:(e:{checked:boolean,q:QuestionEntry})=>void, mergeHandler:(q:QuestionEntry)=>void}, {entry: QuestionEntry[]}> {
      constructor(props: {filterText:string, entries:QuestionEntry[], showArchivedQuestions?:boolean, 
            clickHandler?:(e:any)=>void,userIsAdmin?:boolean,archiveHandler:(e:{checked:boolean,q:QuestionEntry})=>void, mergeHandler:(q:QuestionEntry)=>void}){
        super(props);
        this.state = {
          entry: this.props.entries
        };
    } 
    
    public render() {
    const filterText = this.props.filterText; //new
    //new

    let searchQuestions:QuestionEntry[]= []
    let rows:any = []
    let entries = this.props.entries
    entries.sort(function(a:any, b:any){
      return b.numUpVotes - a.numUpVotes
    })

    entries.forEach((entry) =>{
        if(entry.question.toLowerCase().indexOf(filterText.toLowerCase()) === -1 && (this.props.showArchivedQuestions || !entry.isArchived)){
            return;
        }
       
        searchQuestions.push(entry)})
    for (let ix in searchQuestions) {
          let f=(e:React.ChangeEvent<HTMLInputElement>)=>{
            this.props.archiveHandler({checked:e.target.checked,q:searchQuestions[ix]})
          }
          let adm=undefined
        if(this.props.userIsAdmin){
          adm=<><td className='App-table'><input type='checkbox' onChange={f} defaultChecked={searchQuestions[ix].isArchived}/></td>
          <td className='App-table'><Button entry = {this.props.entries[ix]} mergeHandler={this.props.mergeHandler} color = {"red"}/></td></>
        }
       
      // <button id = {ix} name = {searchQuestions[ix].question} style = {{color: colors, backgroundColor: bgcolor}} className = "merge" onClick = {this.changeMergestate}>{this.state.mergeState}</button>
        
        rows.push(<tr key={ix}><td className="App-table">{searchQuestions[ix].question}</td>
        <td className="App-table"><UpButton entry={searchQuestions[ix]} clickHandler={this.props.clickHandler}/><span>{searchQuestions[ix].numUpVotes}</span></td>
        <td className="App-table"><DownButton entry={searchQuestions[ix]} clickHandler={this.props.clickHandler}/><span>{searchQuestions[ix].numDownVotes}</span></td>
        {adm}
        </tr>) 
    }
      let adm=undefined
      if(this.props.userIsAdmin){
        adm = <><th className="App-table">Archived</th><th className = "App-table">Merge</th></>
      }
    return <table  className="App-center">
            <tbody>
            <tr><th className="App-table">Question</th><th className="App-table">Like</th><th className="App-table">Dislike</th>{adm}</tr>
            {rows}
           </tbody>
           </table>
}
}
