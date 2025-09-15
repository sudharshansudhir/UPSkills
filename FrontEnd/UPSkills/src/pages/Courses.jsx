import React from 'react';
import Welcome from '../components/Welcome.jsx';
import Categories from '../components/Categories.jsx';
import Recommended from '../components/Recommended.jsx';
import Discount from '../components/Discount.jsx';
import TopInstructor from '../components/TopInstructor.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import RemoteLearning from '../components/RemoteLearning.jsx';
import Features from '../components/Features.jsx';
import ForYou from '../components/ForYou.jsx';
// Navbar and Footer are already designed

const Courses = () => {
  return (
    <>
      <Navbar/>
      <Welcome />
      <Categories />
      <Recommended />
      <RemoteLearning/>
      <Discount />
      <Features/>
      <ForYou/>
      <TopInstructor />
      <Footer/>
    </>
  );
};

export default Courses;
