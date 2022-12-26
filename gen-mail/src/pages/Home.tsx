import React, { useState } from 'react';
import styled from '@emotion/styled';
import Sidebar from '../components/SideBar';
import NewEmail from '../components/NewEmail';
import { Box, Center, Select } from '@chakra-ui/react';
import ReplyEmail from '../components/ReplyEmail';
import ReviewEmail from '../components/ReviewEmail';

const Home = () => {
  const [generateOption, setGenerateOption] = useState("New");
  function GenerateOption() {
    switch (generateOption) {
      case "New":
        return (<NewEmail />)
      case "Reply":
        return (<ReplyEmail />)
      default:
        return (<ReviewEmail />);
    }
  }

    return (
      <>
        <Sidebar >
          <StyledHome>
            <Box margin='100px 200px 0px 200px'>
              <Select mb='15px' onChange={(e) => setGenerateOption(e.target.value)} w='200px'>
                <option value='New'>📧 Generate New Email</option>
                <option value='Reply'>📩 Generate Reply for Email</option>
                <option value='Review'>📨 Review Email</option>
              </Select>
              {GenerateOption()}
            </Box>
          </StyledHome>
        </Sidebar>
      </>

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
