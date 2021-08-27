import React from 'react';

import './UserReviews.styles.scss';

import { AiFillStar } from 'react-icons/ai';
import { AiOutlineStar } from 'react-icons/ai';

import samplImg from '../../../images/best dp for whatsapp.jpg';

const UserReviews = () => {
  return (
    <section className='user-reviews'>
      <div className='user-reviews-wrapper'>
        <div className='review-list'>
          <div className='name-user-img flex flex-ai-c'>
            <figure className='user-img'>
              <img src={samplImg} alt='' />
            </figure>
            <div className='name-rating-date'>
              <h4 className='name'>Richard Roe</h4>
              <p className='date'>August 15, 2021</p>
              <div className='rating flex flex-ai-c'>
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
                <AiOutlineStar />
              </div>
            </div>
          </div>

          <p className='review-text'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum
            minima reiciendis repudiandae a, quae nesciunt. Minima nisi nam iure
            necessitatibus.
          </p>
        </div>

        <div className='review-list'>
          <div className='name-user-img flex flex-ai-c'>
            <figure className='user-img'>
              <img src={samplImg} alt='' />
            </figure>
            <div className='name-rating-date'>
              <h4 className='name'>Richard Roe</h4>
              <p className='date'>August 15, 2021</p>
              <div className='rating flex flex-ai-c'>
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
                <AiOutlineStar />
              </div>
            </div>
          </div>

          <p className='review-text'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum
            minima reiciendis repudiandae a, quae nesciunt. Minima nisi nam iure
            necessitatibus.
          </p>
        </div>

        <div className='review-list'>
          <div className='name-user-img flex flex-ai-c'>
            <figure className='user-img'>
              <img src={samplImg} alt='' />
            </figure>
            <div className='name-rating-date'>
              <h4 className='name'>Richard Roe</h4>
              <p className='date'>August 15, 2021</p>
              <div className='rating flex flex-ai-c'>
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
                <AiOutlineStar />
              </div>
            </div>
          </div>

          <p className='review-text'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum
            minima reiciendis repudiandae a, quae nesciunt. Minima nisi nam iure
            necessitatibus.
          </p>
        </div>

        <div className='review-list'>
          <div className='name-user-img flex flex-ai-c'>
            <figure className='user-img'>
              <img src={samplImg} alt='' />
            </figure>
            <div className='name-rating-date'>
              <h4 className='name'>Richard Roe</h4>
              <p className='date'>August 15, 2021</p>
              <div className='rating flex flex-ai-c'>
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
                <AiOutlineStar />
              </div>
            </div>
          </div>

          <p className='review-text'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum
            minima reiciendis repudiandae a, quae nesciunt. Minima nisi nam iure
            necessitatibus.
          </p>
        </div>

        <div className='review-list'>
          <div className='name-user-img flex flex-ai-c'>
            <figure className='user-img'>
              <img src={samplImg} alt='' />
            </figure>
            <div className='name-rating-date'>
              <h4 className='name'>Richard Roe</h4>
              <p className='date'>August 15, 2021</p>
              <div className='rating flex flex-ai-c'>
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
                <AiOutlineStar />
              </div>
            </div>
          </div>

          <p className='review-text'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum
            minima reiciendis repudiandae a, quae nesciunt. Minima nisi nam iure
            necessitatibus.
          </p>
        </div>

        <div className='review-list'>
          <div className='name-user-img flex flex-ai-c'>
            <figure className='user-img'>
              <img src={samplImg} alt='' />
            </figure>
            <div className='name-rating-date'>
              <h4 className='name'>Richard Roe</h4>
              <p className='date'>August 15, 2021</p>
              <div className='rating flex flex-ai-c'>
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
                <AiOutlineStar />
              </div>
            </div>
          </div>

          <p className='review-text'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum
            minima reiciendis repudiandae a, quae nesciunt. Minima nisi nam iure
            necessitatibus.
          </p>
        </div>
      </div>
    </section>
  );
};

export default UserReviews;
