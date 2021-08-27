import React from 'react';

import './Toolbar.styles.scss';

import { AiOutlineMenuUnfold } from 'react-icons/ai';
import { useToggleUpdate } from '../ToggleContext/ToggleContext';

const Toolbar = () => {
  const UpdateToggle = useToggleUpdate();

  return (
    <section className='toolbar container-lg'>
      <div className='toolbar-mobile'>
        <div className='filter'>
          <button onClick={UpdateToggle} className='filter-btn'>
            <AiOutlineMenuUnfold className='icon filter-icon' /> Filters
          </button>
          <button className='clean-all'>Clean All</button>
        </div>
        <div className='sort'>
          <select defaultValue='none' className='sort-dropdown'>
            <option hidden value='none'>
              Default sorting
            </option>
            <option value=''>Sort by popularity</option>
            <option value=''>Sort by average rating</option>
            <option value=''>Sort by price high to low</option>
            <option value=''>Sort by price low to high</option>
          </select>
        </div>

        <div className='product-count'>
          <select defaultValue='none' className='count-dropdown'>
            <option hidden value='none'>
              12
            </option>
            <option value=''>15</option>
            <option value=''>20</option>
            <option value=''>25</option>
            <option value=''>30</option>
          </select>
        </div>
      </div>

      <div className='toolbar-wrapper'>
        <div className='filter'>
          <button className='filter-btn'>
            <AiOutlineMenuUnfold className='icon filter-icon' /> Filter
          </button>
          <button className='clean-all'>Clean All</button>
        </div>
        <div className='sort-product-count'>
          <div className='sort'>
            <p className='title'>Sort by:</p>
            <select defaultValue='none' className='sort-dropdown'>
              <option hidden value='none'>
                Default sorting
              </option>
              <option value=''>Sort by popularity</option>
              <option value=''>Sort by average rating</option>
              <option value=''>Sort by price high to low</option>
              <option value=''>Sort by price low to high</option>
            </select>
          </div>

          <div className='product-count'>
            <p className='title'>Show:</p>
            <select defaultValue='none' className='count-dropdown'>
              <option hidden value='none'>
                12
              </option>
              <option value=''>15</option>
              <option value=''>20</option>
              <option value=''>25</option>
              <option value=''>30</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Toolbar;
