import React from "react";
import styles from './style.scss';
import City from '../lib/index';

export default class APP extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      value:'2222'
    }
  }
  onChange(value) {
    this.setState({value})
  }
  render() {
    return (
      <div className="cityddd">
      <City 
      disabled={false}
      readonly={false}
      onChange={this.onChange} value={this.state.value} />
     
      </div>
    )
  }
}
