import React from 'react';

import './Reviews.styles.scss';

import { AiFillStar } from 'react-icons/ai';
import { AiOutlineStar } from 'react-icons/ai';

const Reviews = () => {
  return (
    <section className='reviews-ratings'>
      <div className='reviews-wrapper'>
        <div className='rating'>
          <div className='average-rating'>
            <div className='col-1 flex flex-ai-c'>
              <h1 className='average-number'>3.3</h1>
              <div className='col-2 content'>
                <p className='text'>Average rating</p>
                <div className='stars flex flex-ai-c'>
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiOutlineStar />
                </div>
                <p className='rating-count'>3442 gloabal rating</p>
              </div>
            </div>
          </div>

          <div className='rating-percentage'>
            <div className='percentage flex flex-ai-c'>
              <p className='star-ratings'>5 star</p>
              <div className='a-meter' role='progressbar'>
                <div style={{ width: '60%' }} className='a-meter-bar'></div>
              </div>
              <p className='percentage-text'>60%</p>
            </div>

            <div className='percentage flex flex-ai-c'>
              <p className='star-ratings'>4 star</p>
              <div className='a-meter' role='progressbar'>
                <div style={{ width: '72%' }} className='a-meter-bar'></div>
              </div>
              <p className='percentage-text'>72%</p>
            </div>

            <div className='percentage flex flex-ai-c'>
              <p className='star-ratings'>3 star</p>
              <div className='a-meter' role='progressbar'>
                <div style={{ width: '60%' }} className='a-meter-bar'></div>
              </div>
              <p className='percentage-text'>60%</p>
            </div>

            <div className='percentage flex flex-ai-c'>
              <p className='star-ratings'>2 star</p>
              <div className='a-meter' role='progressbar'>
                <div style={{ width: '20%' }} className='a-meter-bar'></div>
              </div>
              <p className='percentage-text'>20%</p>
            </div>

            <div className='percentage flex flex-ai-c'>
              <p className='star-ratings'>1 star</p>
              <div className='a-meter' role='progressbar'>
                <div style={{ width: '34%' }} className='a-meter-bar'></div>
              </div>
              <p className='percentage-text'>34%</p>
            </div>
          </div>

          <div className='add-review'>
            <h2 className='heading'>Add A Review</h2>
            <p className='text'>
              Your email address will not be published. Required fields are
              marked *
            </p>
            <div className='user-rating flex flex-ai-c'>
              <p className='text'>Your Rating *</p>
              <div className='star flex flex-ai-c'>
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
              </div>
            </div>
            <form action=''>
              <label htmlFor='review'>Your Review *</label>
              <textarea
                name='review'
                id='review'
                cols='20'
                rows='10'></textarea>

              <label htmlFor='email'>Your Email Address *</label>
              <input type='email' id='email' />
              <label htmlFor='name'>Your Name *</label>
              <input type='text' id='name' />
              <button type='submit'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
