import React from 'react';
import {styled} from "styled-components";
import Select, {components} from 'react-select';

// 수입 카테고리 드롭 다운
const options = [
  { value: 'option1', label: '월급_용돈', color: '#F49291' },
  { value: 'option2', label: '투자_이자', color: '#835BA1' },
  { value: 'option3', label: '기타수입', color: '#D2D2D2' },
];

const DropdownProfit = ({ selectedOption, handleChange }) => {

  const Option = (props) => {
    return (
      <components.Option {...props}>
        <Dot color={props.data.color} />
        {props.label}
      </components.Option>
    );
  };

  const SingleValue = (props) => {
    return (
      <components.SingleValue {...props}>
        <DotDiv>
          <Dot color={props.data.color} />
          <span>{props.children}</span>
        </DotDiv>
      </components.SingleValue>
    );
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: 'none',
      boxShadow: 'none',
    }),
  };

  return (
    <div>
      <Select
      placeholder="카테고리 선택"
      options={options}
      value={selectedOption}
      onChange={handleChange}
      components={{
        Option,
        SingleValue,
        IndicatorSeparator: () => null,
      }}
      styles={customStyles}
      />
    </div>
  );
};

export default DropdownProfit;

const DotDiv = styled.div`
  display: flex;
  align-items: center;
`

const Dot = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin-right: 8px;
`



