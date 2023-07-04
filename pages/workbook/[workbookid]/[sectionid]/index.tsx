import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { splitUrl } from "../../../../scripts/common/url";
import {
  getAllQuestion,
  markQuestion,
} from "../../../../scripts/workbook/section/section";
import shuffle from "just-shuffle";
import {
  Button,
  Container,
  Divider,
  Flex,
  Input,
  Text,
} from "@chakra-ui/react";
import Layout from "../../../../components/Layout";

export default function WorkbookSectionTest() {
  const router = useRouter();
  const [sectionId, setSectionId] = useState<number | undefined>(undefined);

  // 変数
  const [qItems, setQItems] = useState([]);
  const [nowIndex, setNowIndex] = useState(-1);
  const [nowIId, setNowIId] = useState();
  const [nowQuestion, setNowQuestion] = useState("");
  const [nowAnswer, setNowAnswer] = useState("");
  const [nowExplanation, setNowExplanation] = useState("");
  const [nowModeStatus, setNowModeStatus] = useState(1);
  const [nowRightAnswer, setNowRightAnswer] = useState("");
  const [nowCorrect, setNowCorrect] = useState(false);

  useEffect(() => {
    const url = location.pathname;
    const sId = splitUrl(url, 3);
    setSectionId(sId);
    const readyQuestions = async () => {
      const data = await getAllQuestion(sId);
      setQItems(shuffle(data));
      setNowIndex(0);
    };
    readyQuestions();
  }, []);

  async function checkAnswer() {
    const data = await markQuestion(sectionId, nowIId);
    setNowCorrect(data.answer === nowAnswer);
    setNowRightAnswer(data.answer);
    setNowExplanation(data.explanation);
    setNowModeStatus(2);
  }

  function goNext() {
    setNowIndex(nowIndex + 1);
    setNowModeStatus(1);
  }

  useEffect(() => {
    if (nowIndex === -1) return;
    if (nowIndex === qItems.length) router.back();
    setNowQuestion(qItems[nowIndex].question);
    setNowIId(qItems[nowIndex].internalid);
    setNowAnswer("");
    setNowModeStatus(1);
    setNowRightAnswer("");
  }, [nowIndex]);

  return (
    <Layout titleprop={`問題: ${sectionId}`}>
      <Container centerContent width="0.7">
        <Text>{nowQuestion}</Text>
        <Flex>
          <Input
            placeholder="解答を入力"
            value={nowAnswer}
            onChange={(e) => setNowAnswer(e.target.value)}
          />
          <Button
            isDisabled={nowModeStatus !== 1}
            onClick={() => checkAnswer()}
          >
            確定
          </Button>
        </Flex>
        {nowModeStatus === 2 ? (
          <>
            <Divider my={3} />
            <Text>{nowCorrect ? "正解" : "間違い"}</Text>
            <Text mt={2} as="b" fontSize="xl">
              {nowRightAnswer}
            </Text>
            <Text mt={3}>{nowExplanation}</Text>
            <Button mt={10} onClick={() => goNext()}>
              次へ進む
            </Button>
          </>
        ) : null}
      </Container>
    </Layout>
  );
}
