import React from "react";
import PropTypes from 'prop-types';
import reactCityStyle from './react-city.scss';
import Data from './Data';

export default class SearchCity extends React.Component {
  constructor(props){
    super(props);
    this.setValue = this.setValue.bind(this);
  }
  setValue(value){
    this.props.setValue(value)
  }
  render() {
    let value = this.props.data;
    if(value){
      value = value.toString()
    }else{
      value = ''
    }
    let data = []
    Object.keys(Data).forEach((key,index)=>{
      if(index!==0){
        Data[key].forEach((item,itemIndex)=>{
          if(item.data.toLowerCase().indexOf(value.toLocaleLowerCase())!=-1){
            data.push(item)
          }
        })
      }
    })
    if(data.length===0){
      return null;
    }
    return (
      <div className={reactCityStyle.SearchCity}>
      {data.map((item,index)=>{
        return (<li key={index} onClick={this.setValue.bind(this,item.display)}>{item.display}</li>)
      })}
        
      </div>
    )
  }
}