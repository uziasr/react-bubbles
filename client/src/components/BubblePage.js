import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosWithAuth from '../utils/axiosWithAuth'

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(()=>{
    axiosWithAuth()
    .get('colors')
    .then(res=>{
      console.log(res.data)
      setColorList([...colorList, ...res.data])
    })
    .catch(err=>console.log('err',err.response))
  },[])

  if(colorList){
    console.log('hello',colorList)
  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );}
};

export default BubblePage;
