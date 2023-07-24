import React from 'react';
import {styled} from "styled-components";
import Select, {components} from 'react-select';

// 지출 카테고리 드롭 다운
const options = [
  { value: 'option1', label: '식비_간식', color: '#F4CD72' },
  { value: 'option2', label: '주거_통신', color: '#EF9620' },
  { value: 'option3', label: '교통_차량', color: '#F49291' },
  { value: 'option4', label: '생활_마트', color: '#E14B54' },
  { value: 'option5', label: '의류_미용', color: '#835BA1' },
  { value: 'option6', label: '의료_건강', color: '#7DD0B6' },
  { value: 'option7', label: '교육_문화', color: '#30AC63' },
  { value: 'option8', label: '보험_세금', color: '#B6CC75' },
  { value: 'option9', label: '기타지출', color: '#D2D2D2' },
];

const DropdownExpend = ({ selectedOption, handleChange }) => {

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

export default DropdownExpend;

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



