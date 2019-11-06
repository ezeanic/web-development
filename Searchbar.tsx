import React from "react";
type SearchBarProps = {onFilterTextChange:(value:string)=> void , filterText:string } //new
export class SearchBar extends React.Component <SearchBarProps>  {
    constructor(props:SearchBarProps) {
      super(props);
      this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }
    
    handleFilterTextChange(e:any) {
      this.props.onFilterTextChange(e.target.value);
    }
    
    render() {
      return (
        <form>
          <input
            type="text"
            placeholder="Search..."
            value={this.props.filterText}
            onChange={this.handleFilterTextChange}
          />
        </form>
      );
    }
  }