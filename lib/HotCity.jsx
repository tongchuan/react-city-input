import React from "react";
import PropTypes from 'prop-types';
import Data from './Data';
import reactCityStyle from './react-city.scss';
export default class HotCity extends React.Component {
  constructor(props){
    super(props);
    this.onClickSelected = this.onClickSelected.bind(this);
    this.setValue = this.setValue.bind(this);
    this.state = {
      index: 0
    }
  }
  onClickSelected(index){
    this.setState({index})
  }
  setValue(value){
    this.props.setValue(value)
  }
  render() {
    return (
      <div className={reactCityStyle.reactCityHot}>
        <ul className={reactCityStyle.navTabs}>
        {Object.keys(Data).map((item,index)=>{
          return (<li  className={index===this.state.index ? reactCityStyle.selectedItem : ''} onClick={this.onClickSelected.bind(this,index)} key={index}>{item}</li>)
        })}
        </ul>
        <div className={reactCityStyle.panel}>
        {Object.keys(Data).map((item,index)=>{
          if(index===this.state.index){
            if(this.state.index===0){
              return Data[item].map((data,dataindex)=>{
                return (<span key={dataindex} onClick={this.setValue.bind(this,data.display)}>{data.display}</span>)
              })
            }else{
              return [...item].map((key)=>{
                return (
                  <div key={key}>
                    <div className={reactCityStyle.charAt}>{key}</div>
                    <div className={reactCityStyle.charAtList}>{
                      Data[item].map((data,dataindex)=>{
                        if(data.group===key){
                          return (<span key={dataindex} onClick={this.setValue.bind(this,data.display)}>{data.display}</span>)
                        }
                      })
                    }
                    </div>
                  </div>
                )
              })
            }
          }
        })}
        </div>
      </div>
    )
  }
}