import './number.scss';
import React from 'react';
import { Year } from '../../data/data'; // Import the Year function

function YearBox(props) {
  const yearList = Year(); // Get the year data using the Year function

  const renderNum = () => yearList.map((item , index) => {
    return (
      <option key={index}>{item}</option>
    );
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.event(e);
  };

  return (
    <>
      <div className="YearContainer-input__selects">
        <select name="year" className="Year-select" onChange={handleChange}>  
          {renderNum()}
        </select>
      </div>
    </>
  );
}

export default YearBox;