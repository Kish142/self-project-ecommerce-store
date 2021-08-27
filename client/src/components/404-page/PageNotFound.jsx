import React from 'react';
import { Link } from 'react-router-dom';

import { SiGhostery } from 'react-icons/si';

import './PageNotFound.styles.scss';

const PageNotFound = () => {
  return (
    <main className='page-not-found'>
      <h1>
        4
        <span>
          {/* <FaGhost /> */}
          <SiGhostery />
        </span>
        4
      </h1>
      <h2>Error: 404 page not found</h2>
      <p>Sorry, the page you're looking for cannot be accessed</p>
      <Link to='/'>
        <button  className='home-page-btn'>Home Page</button>
      </Link>
    </main>
  );
};

export default PageNotFound;
