# react-city-input

## install
```
npm install react-city-input
```

## user

```
import City from 'react-city-input';

render() {
  return(
    <City
      onChange={(value)=>{
        console.log(value)
      }}
      value={'北京'}
      disabled={false}
      readonly={false}
     />
  )
}
```
## 说明

```
pc端city，模仿携程，数据是 lib/Data.js

含有热点城市，按字母进行查找
包含选择乘车
匹配查找城市
主要针对中国主要城市

```