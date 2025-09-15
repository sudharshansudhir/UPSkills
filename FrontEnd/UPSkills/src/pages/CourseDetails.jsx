import React from 'react'
import Navbar from '../components/Navbar'
import CourseCard from '../components/CourseCard'
import ForYou from '../components/ForYou'
import Footer from '../components/Footer'

const CourseDetails = () => {
  return (
    <div>
        <Navbar/>
        <CourseCard/>
        <ForYou/>
        <Footer/>
    </div>
  )
}

export default CourseDetails