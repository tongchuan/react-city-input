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

## example

1. git clone git@github.com:tongchuan/react-city-input.git
2. npm install or yarn
3. npm run dev
4. npm build
5. npm release
6. npm run dev ===> http://127.0.0.1:8080
7. 可以修改lib下的Data数据
8. 可以修改lib源代码
9. 整个工程是全的，可以任意修改
