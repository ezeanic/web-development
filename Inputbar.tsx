import React from "react";
type InputBarProps = {onQuestionTextChange:(value:string)=>void, onQuestionSubmitChange:()=>void, questionText:string} //just added to create props for input bar

export class InputBar extends React.Component<InputBarProps>{
constructor(props:InputBarProps){
    super(props);
    this.handleQuestionTextChange = this.handleQuestionTextChange.bind(this)
    this.handleQuestionSubmitChange = this.handleQuestionSubmitChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)

}

handleQuestionTextChange(e:any){
    this.props.onQuestionTextChange(e.target.value);
}

handleQuestionSubmitChange(e:any){ // button action
    this.props.onQuestionSubmitChange();
}
handleKeyPress(e:any){
    if (e.key === 'Enter'){
        e.preventDefault()
        this.props.onQuestionSubmitChange();
    }
}
    render() {
    return (
      <form>     
        <input type="text" placeholder="Input Question" value={this.props.questionText} onChange={this.handleQuestionTextChange}
        onKeyPress={this.handleKeyPress} 
        />
        <button type="button" onClick={this.handleQuestionSubmitChange}> Submit </button>
      </form>
      //Send input to postQuestion function
      //could use print default if we get rid of the on keypress for submit
    );
  }
}
