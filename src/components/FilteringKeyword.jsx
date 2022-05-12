import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';

function FilteringKeyword(props) {
  const { key, value } = props.keyword;

  return (
    <p className="bg-gray-100 cursor-pointer hover:bg-gray-200 py-1 mx-[0.25rem] my-1 px-3 rounded-full">
      <span>{key + ' ' + value}</span>
      <ClearIcon onClick={() => props.resetFilter(key)} className="p-1" />
    </p>
  );
}

export default FilteringKeyword;
