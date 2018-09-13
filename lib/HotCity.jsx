import React from "react";
import PropTypes from 'prop-types';
import Data from './Data';
// import './react-city.scss';
// import 'reactCity.css'
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
      <div className="reactCityHot">
        <ul className="navTabs">
        {Object.keys(Data).map((item,index)=>{
          return (<li  className={index===this.state.index ? 'selectedItem' : ''} onClick={this.onClickSelected.bind(this,index)} key={index}>{item}</li>)
        })}
        </ul>
        <div className='panel'>
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
                    <div className='charAt'>{key}</div>
                    <div className='charAtList'>{
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