import React from 'react'
import Navbar from '../components/Navbar'
import AboutSection from '../components/AboutSection'
import Features from '../components/Features'
import Testimonial from '../components/Testimonial'
import Creators from '../components/Creators'
import Footer from '../components/Footer'
import RemoteLearning from '../components/RemoteLearning'
import HeroSection from '../components/HeroSection'
import Trending from '../components/Trending'
import Categories from '../components/Categories'

const HomePage = () => {
  return (
    <div>
        <div>
            <Navbar/>
            <HeroSection/>
            <AboutSection/>
            <Features/>
            <RemoteLearning/>
            <Categories/>            
            <Trending/>
            <Footer/>
        </div>
    </div>
  )
}

export default HomePage