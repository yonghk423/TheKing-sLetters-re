import React, { useState, useEffect } from 'react';
import MainPhoto from './Components/MainPhoto';
import ServiceIntro from './Components/ServiceIntro';
import Category from './Components/Category';
import Comments from './Components/Comments';
import FinalIntro from './Components/FinalIntro';

const LandingPage = () => {
  return (
    <>
      <MainPhoto />
      <ServiceIntro />
      <Category />
      <Comments />
      <FinalIntro />
    </>
  );
};

export default LandingPage;