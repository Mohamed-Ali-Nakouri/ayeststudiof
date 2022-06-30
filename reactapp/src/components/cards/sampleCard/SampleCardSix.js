import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

import { Cards } from '../frame/cards-frame';


const CardWrapper = styled.figure`
  display: flex;
  margin: 0;
  position: relative;
  h2,
  p {
    margin: 0;
  }
  figcaption {
    .more {
      position: absolute;
      top: 0px;
      ${({ theme }) => (theme.rtl ? 'left' : 'right')}: 0;
      a {
        color: ${({ theme }) => theme['extra-light-color']};
      }
    }
    h2 {
      font-size: 20px;
      font-weight: 600;
    }
    p {
      font-size: 14px;
      color: ${({ theme }) => theme['light-color']};
    }
  }
`;

const Icon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme, className }) => theme[`${className}-color`]};
  ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 20px;
`;

const SampleCardSix = (summaryData) => {
  
  return (
    <Cards headless>
      <CardWrapper>
        <Icon className={"primary"}>
          <img src={""} alt="" />
        </Icon>
        <figcaption>
          <div className="more">
          </div>
          <h2></h2>
          <p></p>
        </figcaption>
      </CardWrapper>
    </Cards>
  );
};

SampleCardSix.propTypes = {
  item: propTypes.object,
};

SampleCardSix.defaultProps = {
  item: {
    id: 1,
    title: '47',
    content: 'Total tasks',
    img: 'static/img/icon/1.svg',
    className: 'primary',
  },
};

export default SampleCardSix;
