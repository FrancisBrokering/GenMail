import React from "react";
import styled from "@emotion/styled";
import { Text, Box } from "@chakra-ui/react";

const Home = () => {
  return (
    <Box padding="30px 100px 0px 100px">
      <Text fontWeight="600" fontSize="50px">
        AI の力を使って誰よりも早く正しい英文を作成。
      </Text>
      <Text fontWeight="300" fontSize="1.25rem" color="#6c757d">
        英語を使ったEメールの返信、SNSの投稿、メッセージのやり取りで困ったことはありませんか。GenPlateを使えばどんな難しい英文でも自分の用途に合わせてほんの数分で作成できてしまいます。
      </Text>
      <Text>自分の用件を入力するだけでAIが英文を自動生成します。</Text>
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
