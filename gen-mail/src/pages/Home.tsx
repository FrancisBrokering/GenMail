import React from 'react';
import styled from '@emotion/styled';

const Home = () => {
  return (
    <StyledHome>
      <div className='center'>
        <p>
          This element is both horizontaly and vertically center.
        </p>
      </div>
    </StyledHome>
  )
}

const StyledHome = styled('div')`
    width: 100%;
    height: 100vh;
    position: relative;

    .center {
        margin: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }
`

export default Home;
