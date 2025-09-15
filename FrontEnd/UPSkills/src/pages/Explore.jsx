import React from 'react'
import Navbar from '../components/Navbar'
import ExploreSearch from '../components/ExploreSearch'
import Recommended from "../components/Recommended"
import TopInstructor from "../components/TopInstructor"
import Features from '../components/Features'
import Footer from '../components/Footer'
import ForYou from '../components/ForYou'
import Discount from '../components/Discount'
import Testimonial from '../components/Testimonial'
import Welcome from '../components/Welcome'

const Explore = () => {
  return (
    <div>
      <Navbar/>
      <ExploreSearch/>
      <Recommended/>
      <TopInstructor/>
      <ForYou/>
      <Testimonial/>
      <Discount/>
      <Footer/>
    </div>
  )
}

export default Explore