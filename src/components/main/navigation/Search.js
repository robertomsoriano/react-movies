import React from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  Input,
  Button,
  DropdownToggle
} from "reactstrap";

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.toggleSplit = this.toggleSplit.bind(this);
    this.fetchStr = this.fetchStr.bind(this);
    this.state = {
      dropdownOpen: false,
      splitButtonOpen: false,
      filter: false,
      onSearchButtonClick: props.onSearchButtonClick,
      queryStr: ""
    };
  }

  toggleDropDown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  toggleSplit() {
    this.setState({
      splitButtonOpen: !this.state.splitButtonOpen
    });
  }
  fetchStr(e) {
    this.setState({ queryStr: e.target.value });
  }
  render() {
    return (
      <div className="mr-3 ml-2">
        <InputGroup>
          <InputGroupButtonDropdown
            addonType="prepend"
            isOpen={this.state.splitButtonOpen}
            toggle={this.toggleSplit}
          >
            <Button outline onClick={e => this.props.toggleFilter()}>
              Filter Options
            </Button>
            <DropdownToggle
              split
              outline
              onClick={e => this.props.toggleFilter()}
            />
          </InputGroupButtonDropdown>
          <Input
            placeholder="Search for a movie..."
            onChange={e => this.fetchStr(e)}
          />
          <InputGroupAddon addonType="append">
            <Button
              color="secondary"
              onClick={e => this.props.fetchSearch(this.state.queryStr)}
            >
              Search
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
    );
  }
}
