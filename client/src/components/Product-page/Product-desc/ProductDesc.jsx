import React from 'react';

import './ProductDesc.styles.scss';

const ProductDesc = ({ desc }) => {
  return (
    <section className='product-desc'>
      <div className='desc-wrapper'>
        <h1 className='title'>Description:</h1>
        <p className='text'>
          {/* Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque,
          numquam eum recusandae soluta rerum accusamus ut dignissimos deserunt
          perferendis cum fuga sit reiciendis, minus minima? Magni est nemo quod
          dolorum.
          <br />
          <br />
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam
          veniam ullam, velit dolor voluptatem nesciunt aspernatur ducimus
          similique atque exercitationem quo quidem in mollitia amet. Officiis
          at, eius laborum, officia natus quia reiciendis modi ipsa illum ea
          temporibus tempore asperiores? Earum facere error distinctio sequi.
          <br />
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda est
          facere enim repellendus obcaecati fuga illum ratione, libero error
          molestiae ut. Optio alias explicabo adipisci ducimus eligendi
          repudiandae quod expedita placeat dolorum quos. */}
          {desc}
        </p>
      </div>
    </section>
  );
};

export default ProductDesc;
