import React, { useRef, useEffect } from 'react';

import './Filter.styles.scss';

import { AiOutlineMenuUnfold } from 'react-icons/ai';

import { useToggle, useToggleUpdate } from '../ToggleContext/ToggleContext';

const Filter = () => {
  const ToggleFilter = useToggle();
  const UpdateToggle = useToggleUpdate();

  const filter = useRef();

  useEffect(() => {
    const checkClickableOutsie = (event) => {
      ToggleFilter &&
        filter.current &&
        !filter.current.contains(event.target) &&
        event.target.className === 'overlay-for-toggle' &&
        UpdateToggle();
    };

    document.addEventListener('mousedown', checkClickableOutsie);
  }, [ToggleFilter, UpdateToggle]);

  ToggleFilter
    ? (document.body.style.overflow = 'hidden')
    : (document.body.style.overflow = 'auto');

  return (
    <section
      style={{ display: ToggleFilter ? 'block' : 'none' }}
      className='filter container-lg'>
      <div
        style={{ display: ToggleFilter ? 'block' : 'none' }}
        className='overlay-for-toggle'></div>
      <div ref={filter} className='filter-wrapper'>
        <div className='menu-title'>
          <button onClick={UpdateToggle} className='filter-button'>
            <AiOutlineMenuUnfold className='icon filter-icon' /> Filter
          </button>
          <button className='filter-clean'>Clean All</button>
        </div>
        <div className='filter-item'>
          <div className='title'>
            <h1>Categories</h1>
          </div>

          <input type='checkbox' id='brand' name='category' />
          <label htmlFor='brand'>
            <span>Brand Sale</span>
          </label>
          <br />
          <input type='checkbox' id='fitness' name='category' />
          <label htmlFor='fitness'>
            <span>For Fitness</span>
          </label>
          <br />
          <input type='checkbox' id='kids' name='category' />
          <label htmlFor='kids'>
            <span>For Kids</span>
          </label>
          <br />
          <input type='checkbox' id='sneakers' name='category' />
          <label htmlFor='sneakers'>
            <span>Sneakers</span>
          </label>
          <br />
          <input type='checkbox' id='watch' name='category' />
          <label htmlFor='watch'>
            <span>Top Watches</span>
          </label>
        </div>

        <div className='filter-item'>
          <div className='title'>
            <h1>price</h1>
          </div>
          <input type='radio' id='300-500' name='price' />
          <label htmlFor='300-500'>
            <span>Rs, 300 to Rs, 500</span>
          </label>
          <br />
          <input type='radio' id='600-600' name='price' />
          <label htmlFor='600-600'>
            <span>Rs, 600 to Rs, 600</span>
          </label>
          <br />
          <input type='radio' id='600-800' name='price' />
          <label htmlFor='600-800'>
            <span>Rs, 600 to Rs, 800</span>
          </label>
          <br />
          <input type='radio' id='900-1500' name='price' />
          <label htmlFor='900-1500'>
            <span>Rs, 900 to Rs, 1500</span>
          </label>
          <br />
          <input type='radio' id='1500' name='price' />
          <label htmlFor='1500'>
            <span>Rs, 1500+</span>
          </label>
          <br />
        </div>

        <div className='filter-item'>
          <div className='title'>
            <h1>Color</h1>
          </div>

          <input type='checkbox' id='black' name='color' />
          <label htmlFor='black'>
            <span>Black</span>
          </label>
          <br />
          <input type='checkbox' id='Blue' name='color' />
          <label htmlFor='Blue'>
            <span>Blue</span>
          </label>
          <br />
          <input type='checkbox' id='Brows' name='color' />
          <label htmlFor='Brows'>
            <span>Brown</span>
          </label>
          <br />
          <input type='checkbox' id='gray' name='color' />
          <label htmlFor='gray'>
            <span>Gray</span>
          </label>
          <br />
          <input type='checkbox' id='orange' name='color' />
          <label htmlFor='orange'>
            <span>Orange</span>
          </label>
          <br />
        </div>

        <div className='filter-item'>
          <div className='title'>
            <h1>Brands</h1>
          </div>
          <input type='checkbox' id='cd' name='brands' />
          <label htmlFor='cd'>
            <span>Cinderella</span>
          </label>
          <br />
          <input type='checkbox' id='cm' name='brands' />
          <label htmlFor='cm'>
            <span>Comedy</span>
          </label>
          <br />
          <input type='checkbox' id='rc' name='brands' />
          <label htmlFor='rc'>
            <span>RightCheck</span>
          </label>
          <br />
          <input type='checkbox' id='ss' name='brands' />
          <label htmlFor='ss'>
            <span>SkillStar</span>
          </label>
          <br />
          <input type='checkbox' id='de' name='brands' />
          <label htmlFor='de'>
            <span>Denim</span>
          </label>
          <br />
        </div>

        <div className='filter-item'>
          <div className='title'>
            <h1>Sizes</h1>
          </div>
          <input type='checkbox' id='xl' name='size' />
          <label htmlFor='xl'>
            <span>Extra Large</span>
          </label>
          <br />
          <input type='checkbox' id='l' name='size' />
          <label htmlFor='l'>
            <span>Large</span>
          </label>
          <br />
          <input type='checkbox' id='md' name='size' />
          <label htmlFor='md'>
            <span>Medium</span>
          </label>
          <br />
          <input type='checkbox' id='sm' name='size' />
          <label htmlFor='sm'>
            <span>Small</span>
          </label>
          <br />
          <input type='checkbox' id='xs' name='size' />
          <label htmlFor='xs'>
            <span>Extra Small</span>
          </label>
          <br />
        </div>
      </div>
    </section>
  );
};

export default Filter;
