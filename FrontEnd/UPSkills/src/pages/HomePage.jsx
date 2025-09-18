import React from 'react'
import Navbar from '../components/Navbar'
import AboutSection from '../components/AboutSection'
import Features from '../components/Features'
import Testimonial from '../components/Testimonial'
import Creators from '../components/Creators'
import Footer from '../components/Footer'
import RemoteLearning from '../components/RemoteLearning'

const HomePage = () => {
  return (
    <div>
        <div>
            <Navbar/>
            <AboutSection/>
            <Features/>
            <RemoteLearning/>
            <Testimonial/>
            {/* <Creators/> */}
            <Footer/>
        </div>
    </div>
  )
}

export default HomePage