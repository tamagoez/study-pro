import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { splitUrl } from "../../../../scripts/common/url";
import {
  getAllQuestion,
  markQuestion,
} from "../../../../scripts/workbook/section/section";
import shuffle from "just-shuffle";
import { Button, Container, Input, Text } from "@chakra-ui/react";
import Layout from "../../../../components/Layout";

export default function WorkbookSectionTest() {
  const router = useRouter();
  const [sectionId, setSectionId] = useState<number | undefined>(undefined);

  // 変数
  const [qItems, setQItems] = useState([]);
  const [nowIndex, setNowIndex] = useState(-1);
  const [nowIId, setNowNIId] = useState();
  const [nowQuestion, setNowQuestion] = useState("");
  const [nowAnswer, setNowAnswer] = useState("");
  const [nowExplanation, setNowExplanation] = useState("");
  const [nowModeStatus, setNowModeStatus] = useState(1);
  const [nowRightAnswer, setNowRightAnswer] = useState("")

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
    setNowRightAnswer(data.answer)
    setNowExplanation(data.explanation);
  }

  function goNext() {
    setNowIndex(nowIndex + 1)
    setNowModeStatus(1)
  }

  useEffect(() => {
    if (nowIndex === -1) return;
setNowQuestion(qItems[nowIndex])
setNowAnswer("")
setNowModeStatus(1)
setNowRightAnswer("")
  }, [nowIndex])


  return (
    <Layout titleprop={`問題: ${sectionId}`}>
      <Container centerContent width="0.7">
        <Text>{nowQuestion}</Text>
        <Input
          placeholder="解答を入力"
          onChange={(e) => setNowAnswer(e.target.value)}
        />
        <Button disabled={nowModeStatus != 1} onClick={() => checkAnswer()}>確定</Button>
        {nowModeStatus === 2 ? <>{nowRightAnswer}<br />{nowExplanation}<br /><Button onClick={() => goNext()}>次へ進む</Button></> : null}
      </Container>
    </Layout>
  );
}
