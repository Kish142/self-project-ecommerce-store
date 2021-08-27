import React from 'react';

import './BillingDetails.styles.scss';

const BillingDetails = () => {
  return (
    <section className='billing-details'>
      <div className='billing-details-wrapper'>
        <h2 className='heading'>Billing Details</h2>
        <form action=''>
          <label htmlFor='fname'>First Name *</label>
          <input type='text' id='fname' />
          <label htmlFor='lname'>Last Name *</label>
          <input type='text' id='lname' />
          <label htmlFor='cname'>Company Name (optional)</label>
          <input type='text' id='cname' />
          <label htmlFor="country">Country / Region *</label>
          <select id='country' className='country'>
            <option value=''>United State (US)</option>
            <option value=''>India (IN)</option>
            <option value=''>New Zealand (NZ)</option>
            <option value=''>Australia (AU)</option>
            <option value=''>Singapore (SN)</option>
            <option value=''>United Kingdom (UK)</option>
          </select>
          <label htmlFor='address'>Street Address *</label>
          <input
            type='text'
            id='address'
            placeholder='House number and street name'
          />
          <input
            type='text'
            id='address'
            placeholder='Apartment, suite, unit, ect (optional)'
          />
          <label htmlFor='city'>Town / City *</label>
          <input type='text' id='city' />
          <label htmlFor="state">State *</label>
          <select id='state' className='state'>
            <option value=''>California</option>
            <option value=''>Manchester</option>
            <option value=''>New York</option>
            <option value=''>Washington DC</option>
            <option value=''>Salem</option>
          </select>
          <label htmlFor='zip'>Zip *</label>
          <input type='text' id='zip' />
          <label htmlFor='phone'>Phone *</label>
          <input type='text' id='phone' />
          <label htmlFor='email'>Email Address *</label>
          <input type='emila' id='email' />
          <div className='additonal-info'>
            <h3>Additional Information</h3>
            <label htmlFor='notes'>Order Notes (optional)</label>
            <textarea
              name='notes'
              id='notes'
              cols='30'
              rows='10'
              placeholder='Notes about your order, e.g. special notes for delivery'></textarea>
          </div>
        </form>
      </div>
    </section>
  );
};

export default BillingDetails;
