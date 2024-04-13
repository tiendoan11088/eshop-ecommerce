import React, { useEffect } from 'react'
import style from './Home.module.scss'
// import Slider from '../../components/slider/Slider'
import {Slider, AdminOnlyRoute} from '../../components/index'
import Product from '../../components/product/Product'


const Home = () => {
  const url = window.location.href;

  const scrollToProducts = () => {
    if(url.includes("#products")){
      window.scrollTo({
        top:700,
        behavior: 'smooth'
      })
      return
    }
  }

  useEffect(()=> {
    scrollToProducts()
  },[])

  return (
    <div>
      <Slider />
      <Product />
    </div>
  )
}

export default Home
