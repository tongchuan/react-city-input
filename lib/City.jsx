import React from "react";
import PropTypes from 'prop-types';
import classnames from 'classnames';
import onClickOutside from 'react-onclickoutside'
import TetherCity from './TetherCity';
import HotCity from './HotCity';
import SearchCity from './SearchCity';
import reactCityStyle from './react-city.scss';
const WrappedComponent = onClickOutside(HotCity)
const WrappedComponent2 = onClickOutside(SearchCity)

export default class City extends React.Component {
  constructor(props){
    super(props);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.setOpen = this.setOpen.bind(this);
    this.setValue = this.setValue.bind(this);
    this.onChange = this.onChange.bind(this);
    this.renderCityList = this.renderCityList.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      open: 0,
      value: this.props.value
    }
  }
  onFocus(){
    this.setOpen(1)
    this.props.onFocus();
  }
  onBlur(){
    // this.setOpen(0)
    this.props.onBlur()
  }
  onKeyUp(event) {
    if(this.props.readonly){
      return null;
    }
    let value = this.refs.input.value
    if(value){
      this.setOpen(2)
    }else{
      this.setOpen(1)
    }
    if (event.key === 'Enter') {
      event.preventDefault()
    } else if (event.key === 'Escape') {
      event.preventDefault()
      this.setOpen(0)
    } else if (event.key === 'Tab') {
      this.setOpen(0)
    }
    console.log(this.refs.input.value)
  }
  setValue(value) {
    this.setState({value},()=>{
      this.props.onChange(value)
      // this.setValue(value)
    })
    this.setOpen(0)
  }
  onChange(event){
    let value = event.target.value
    this.setState({value},()=>{
      this.props.onChange(value)
    })
  }
  setOpen(open) {
    this.setState({
      open
    })
  }
  handleClickOutside(event){
    this.setOpen(0)
  }
  renderCityList() {
    if(this.state.open===0 || this.props.disabled){
      return null;
    }
    if(this.state.open===2){
      
      return (
        <WrappedComponent2
          setOpen={this.setOpen}
          setValue={this.setValue}
          data={this.state.value}
          handleClickOutside={this.handleClickOutside} />
      )
    }
    return (
      <WrappedComponent
        setOpen={this.setOpen}
        setValue={this.setValue}
        handleClickOutside={this.handleClickOutside} />
    )
  }
  render() {
    const cityList = this.renderCityList();
    // console.log(cityList)
    return (
      <TetherCity
        constraints={this.props.tetherConstraints}
        renderElementTo={this.props.renderCalendarTo}
        targetOffset={this.props.popoverTargetOffset}
        targetAttachment={this.props.popoverTargetAttachment}
        attachment={this.props.popoverAttachment}
        classPrefix={'react-city-input'}
      >
        <input
          type="text"
          ref="input"
          value={this.state.value}
          onChange={this.onChange}
          readOnly={this.props.readonly}
          disabled={this.props.disabled}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onKeyUp={this.onKeyUp}
          onKeyDown={this.onKeyDown}
          className={this.props.className} />
        {cityList}
      </TetherCity>
    )
  }
}

City.defaultProps = {
  readonly: false,
  disabled: false,
  name: '',
  className: '',
  tetherConstraints: [{
    to: 'window',
    attachment: 'together'
  }],
  popoverTargetOffset: '0 0',
  popoverTargetAttachment: 'bottom left',
  popoverAttachment: 'top left',
  onFocus: ()=> {},
  onBlur: () => {},
  onChange: () => {},
  value: ''
}

City.propTypes = {
  readonly: PropTypes.bool,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  className: PropTypes.string,
  tetherConstraints: PropTypes.array,
  renderCalendarTo: PropTypes.any,
  popoverTargetOffset: PropTypes.string,
  popoverTargetAttachment: PropTypes.string,
  popoverAttachment: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string
}