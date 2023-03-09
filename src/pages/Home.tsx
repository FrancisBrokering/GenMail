import React from "react";
import styled from "@emotion/styled";
import {
  Text,
  Box,
  Image,
  Flex,
  Button,
  Center,
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
  Icon,
  HStack,
  Grid,
  GridItem,
  VStack,
} from "@chakra-ui/react";
import MacBookPng from "../assets/images/macbook.png";
import Face1 from "../assets/images/face1.png";
import Face2 from "../assets/images/face2.png";
import Face3 from "../assets/images/face3.png";
import Face4 from "../assets/images/face4.png";
import Face5 from "../assets/images/face5.png";
import BackgroundMap from "../assets/images/worldMap3.png";
import Background from "../assets/images/background.png";
import AI from "../assets/images/emailPerson1.png";
import { useNavigate } from "react-router-dom";
import { FiGlobe } from "react-icons/fi";
import { ReactComponent as Clock } from "../assets/icons/clock.svg";
import { ReactComponent as Earth } from "../assets/icons/earth.svg";
import { ReactComponent as Expert } from "../assets/icons/expertise.svg";
import { ReactComponent as Speak } from "../assets/icons/speak.svg";
//copyright @pikisuperstar from freepik
//copyright <a href="http://www.freepik.com">Designed by vectorjuice / Freepik</a>

const Home = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/email");
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const cards = [
    {
      heading: "早くて簡単",
      body: "用件を入力するだけで瞬時に文章を自動生成。",
      icon: Clock,
    },
    {
      heading: "多言語対応",
      body: "GenPlateは現在5言語に対応しております。",
      icon: Earth,
    },
    {
      heading: "口調を選択",
      body: "自分の使いたい口調に合わせて文章を生成。",
      icon: Speak,
    },
    {
      heading: "正確",
      body: "AIの力で正確な文章の生成を実現します。",
      icon: Expert,
    },
  ];

  return (
    <Box>
      <Box bg="linear-gradient(80deg, #1f0098 0%, #05d7f0 100%);">
        <Box
          padding={{ base: "20px", md: "130px 100px 0px 100px" }}
          backgroundSize=" 100% 100%"
          backgroundImage={Background}
        >
          <Flex>
            <Box>
              <Text color="white" fontWeight="600" fontSize="50px">
                AI の力を使って誰よりも早く英文を作成。
              </Text>
              <Text fontWeight="300" fontSize="1.25rem" color="#bedff9">
                英語を使ったEメールの返信、SNSの投稿、メッセージのやり取りで困ったことはありませんか。GenPlateを使えばどんな難しい英文でも自分の用途に合わせてほんの数分で作成できてしまいます。
              </Text>
              <Text color="#03c3ff" fontSize="20px" fontWeight="20px">
                自分の用件を入力するだけでAIが英文を自動生成します。
              </Text>
            </Box>
            {/* <Box>
              <Image src={MacBookPng} />
            </Box> */}
          </Flex>
          <Center pt="100px">
            <Button
              bg="#dead40"
              color="white"
              className="homepageButton"
              onClick={handleClick}
            >
              今すぐ使ってみる
            </Button>
          </Center>
        </Box>
        <Box display="block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#f0f6f5"
            viewBox="0 0 1000 100"
            preserveAspectRatio="none"
          >
            <path d="M500,97C126.7,96.3,0.8,19.8,0,0v100l1000,0V1C1000,19.4,873.3,97.8,500,97z"></path>
          </svg>
        </Box>
      </Box>
      <Box
        padding={{ base: "20px", md: "100px" }}
        marginTop="-1px"
        bg="#f0f6f5"
      >
        <Flex
          direction={{ base: "column", md: "row" }}
          bg="#f0f6f5"
          bottom="-1px"
        >
          {cards.map((item, index) => (
            <Flex key={index} direction="column">
              {index % 2 != 0 ? (
                <Box display={{ base: "none", md: "flex" }} h="80px" />
              ) : (
                <Box />
              )}
              <Card
                margin={{ base: "20px 0px 20px 0px", md: "0px 20px 0px 20px" }}
                rounded="15px"
                alignItems="center"
                boxShadow="8px 8px 30px 0px rgb(42 67 113 / 15%)"
                pb="20px"
              >
                <CardHeader>
                  <Box
                    position="relative"
                    w="60px"
                    h="60px"
                    borderRadius="50%"
                    bg="#03c3ff"
                    boxShadow="8px 8px 30px 0px rgb(42 67 113 / 30%)"
                  >
                    <Icon
                      boxSize="30px"
                      position="absolute"
                      top="50%"
                      left="50%"
                      transform="translate(-50%,-50%)"
                      as={item.icon}
                    />
                  </Box>
                </CardHeader>
                <CardBody>
                  <Heading size="md">{item.heading}</Heading>
                </CardBody>
                <CardFooter>
                  <Text textAlign="center">{item.body}</Text>
                </CardFooter>
              </Card>
            </Flex>
          ))}
        </Flex>
      </Box>
      <Grid
        templateRows={{ base: "repeat(5, 1fr)", md: "repeat(1, 1fr)" }}
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(5, 1fr)" }}
        gap={6}
        padding={{ base: "20px", md: "10px 100px 10px 100px" }}
        bg="#f0f6f5"
      >
        <GridItem rowSpan={{ base: 3, md: 1 }} colSpan={{ base: 1, md: 3 }}>
          <Text fontWeight="700" color="#025de3" mb="20px">
            GenPlateってどんなアプリ?
          </Text>
          <Text>
            GenPlateは、様々な言語でメール、SNSの投稿やメッセージのテンプレートを自動生成するアプリです。仕事やプライベートで海外の人と交流があり、普段メールのやりとりやSNS上でのメッセージの送受信を英語で行なっている方にとっては、非常に便利なアプリとなっています。
          </Text>
          <Text>
            このアプリは、英文を書く作業を効率的に行いたい方や、英文を書くことに苦労する方、書いた英文が正しいのかわからない方、ネイティブの人のような英文を書きたいと思う方々にピッタリです。
          </Text>
          <Text>
            GenPlateは、テンプレートを生成するだけでなく、文法の修正、Eメールに行数を足すといった機能も備えています。このアプリを使うことで、簡単に正確な英文を書くことができるようになります。また、作成されたテンプレートをその場で編集することも可能ですす。
            <Text>
              GenPlateは、今後もさまざまな言語と機能を追加していく予定です。是非、このアプリを利用して、英文を書く作業を効率的かつ正確に行ってみてください。
            </Text>
          </Text>
        </GridItem>
        <GridItem rowSpan={{ base: 2, md: 1 }} colSpan={{ base: 1, md: 2 }}>
          <Image src={AI} />
        </GridItem>
      </Grid>
      <Box display="block" fontSize="0" bg="#f0f6f5">
        <svg
          fill="#e8eeef"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
        >
          <path d="M500,97C126.7,96.3,0.8,19.8,0,0v100l1000,0V1C1000,19.4,873.3,97.8,500,97z"></path>
        </svg>
      </Box>
      <Box
        position="relative"
        bg="#d7ddde"
        backgroundImage={BackgroundMap}
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
        backgroundSize="100% 101%"
        marginBottom="-3px"
        display={{ base: "none", md: "block" }}
      >
        <Image
          w="6%"
          position="absolute"
          left="78%"
          right="20%"
          top="10%"
          bottom="20%"
          src={Face1}
        />
        <Image
          w="5%"
          position="absolute"
          left="75%"
          right="20%"
          top="60%"
          bottom="80%"
          src={Face2}
        />
        <Image
          w="5%"
          position="absolute"
          left="72%"
          right="20%"
          top="25%"
          bottom="20%"
          src={Face3}
        />
        <Image
          w="7%"
          position="absolute"
          left="18%"
          right="20%"
          top="14%"
          bottom="20%"
          src={Face4}
        />
        <Image
          w="6%"
          position="absolute"
          left="23%"
          right="20%"
          top="54%"
          bottom="20%"
          src={Face5}
        />
        <Center>
          <Flex
            margin="13% 10% 13% 10%"
            direction="column"
            alignItems="center"
            zIndex="1"
          >
            <Text textAlign="center" fontSize="30px" fontWeight="600">
              世界中の人との繋がりをよりスムーズに
            </Text>
            {/* <Text
              fontSize="40px"
              fontWeight="800"
              color="#03c3ff"
              textShadow="2px 2px #020d2f"
            >
              今すぐ体験
            </Text> */}
            <Button
              bg="#dead40"
              color="white"
              className="homepageButton"
              onClick={handleClick}
            >
              始める
            </Button>
          </Flex>
        </Center>

        {/* <Image src="https://onum-wp.s3.amazonaws.com/images/bg-maps2-1.png" /> */}
      </Box>
      <Box
        bg="linear-gradient(145deg, #002cae 47%, #04b6f1 100%);"
        height="94%"
      >
        <Box transform="rotate(180deg)" display="block" fontSize="0">
          <svg
            fill="#d7ddde"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1000 100"
            preserveAspectRatio="none"
          >
            <path d="M500,97C126.7,96.3,0.8,19.8,0,0v100l1000,0V1C1000,19.4,873.3,97.8,500,97z"></path>
          </svg>
        </Box>
        <Center pb="60px">
          <Flex direction="column" alignItems="center" textAlign="center">
            <Text color="white" fontWeight="600" fontSize="40px">
              GenPlate
            </Text>
            <Text color="#acebff">
              Copyright © 2023 The GenPlate Team. All Rights Reserved.
            </Text>
            <Button mt="30px" onClick={scrollToTop}>
              Topへ戻る
            </Button>
          </Flex>
        </Center>
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
