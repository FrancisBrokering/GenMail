import React from "react";
import styled from "@emotion/styled";
import { Text, Box, Image, Flex, Button, Center } from "@chakra-ui/react";
import MacBookPng from "../assets/images/macbook.png"
import Face1 from "../assets/images/face1.png"
import Face2 from "../assets/images/face2.png"
import Face3 from "../assets/images/face3.png"
import Face4 from "../assets/images/face4.png"
import BackgroundMap from "../assets/images/worldMap2.png"
// import { ReactComponent as WorldMap } from "../assets/images/worldMap.svg"
//copyright @pikisuperstar from freepik

const Home = () => {
  return (
    <Box>
      <Box bg="linear-gradient(80deg, #1f0098 0%, #05d7f0 100%);" >
        <Box padding="130px 100px 0px 100px" backgroundSize=" 100% 100%" backgroundImage="https://onum-wp.s3.amazonaws.com/images/bg-overlay-home1.png">
          <Flex>
            <Box>
              <Text color='white' fontWeight="600" fontSize="50px">
                AI の力を使って誰よりも早く英文を作成。
              </Text>
              <Text fontWeight="300" fontSize="1.25rem" color="#bedff9">
                英語を使ったEメールの返信、SNSの投稿、メッセージのやり取りで困ったことはありませんか。GenPlateを使えばどんな難しい英文でも自分の用途に合わせてほんの数分で作成できてしまいます。
              </Text>
              <Text color="#03c3ff" fontSize="20px" fontWeight='20px' >自分の用件を入力するだけでAIが英文を自動生成します。</Text>
            </Box>
            <Box>
              <Image src={MacBookPng} />
            </Box>
          </Flex>
          <Center pt="100px">
            <Button bg='#dead40' color='white' className='homepageButton'>今すぐ使ってみる</Button>
          </Center>
        </Box>
        <svg xmlns="http://www.w3.org/2000/svg" fill='#f0f6f5' viewBox="0 0 1000 100" preserveAspectRatio="none">
          <path d="M500,97C126.7,96.3,0.8,19.8,0,0v100l1000,0V1C1000,19.4,873.3,97.8,500,97z"></path>
        </svg>
      </Box>
      <Box bg='#f0f6f5' height="200px" bottom="-1px" >

      </Box>
      <Box
        position='relative'
        bg='#d7ddde'
        backgroundImage={BackgroundMap}
        backgroundSize="contain"
        backgroundRepeat="no-repeat"
        width="100%"
        height="0"
        paddingBottom="66.64%"
        className="test"
        // height='510px'
      >
        <Image w='70px' position='absolute' left='1000px' right='200px' top='100px' bottom='200px' src={Face1} />
        <Image w='70px' position='absolute' src={Face2} />
        <Image w='70px' position='absolute' src={Face3} />
        <Image w='70px' position='absolute' src={Face4} />
        <Text>世界中の人との繋がりをよりスムーズに</Text>
        <Text>無料で体験</Text>

        {/* <Image src="https://onum-wp.s3.amazonaws.com/images/bg-maps2-1.png" /> */}
      </Box>
      <Box transform="rotate(180deg)" bg="linear-gradient(145deg, #002cae 47%, #04b6f1 100%);" border="0">
        <Box pb="200px">

        </Box>
        <Box >
          <svg fill="#d7ddde" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
            <path d="M500,97C126.7,96.3,0.8,19.8,0,0v100l1000,0V1C1000,19.4,873.3,97.8,500,97z"></path>
          </svg>
        </Box>
      </Box>
    </Box>
  );
};

const StyledHome = styled("div")`
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
`;

export default Home;
