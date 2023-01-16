import React from 'react';
import './ShowMoreBtn.css';

const ShowMoreBtn = (props) => {
  return (
    <div className='showmorebtn' onClick={props.Click}>
      <p>{props.text}</p>
    </div>
  )
}

export default ShowMoreBtn;