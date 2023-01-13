import React from 'react';
import PropTypes from 'prop-types'
import './FourColumnGrid.css'

const fourColumnGrid = (props) => {
  const renderElements = () => {
    const gridElements = props.children.map((element, i) => {
      return (
        <div key={i} className='grid-element'>
          {element}
        </div>
      )
  });
    return gridElements;
  }
  
  return (
    <div className='grid'>
      {props.header && !props.loading ? <h1>{props.header}</h1> : null}
      <div className='grid-content'>
        {renderElements()}
      </div>
    </div>
  )
};

fourColumnGrid.propTypes = {
  header: PropTypes.string,
  loading: PropTypes.bool
};

export default fourColumnGrid;