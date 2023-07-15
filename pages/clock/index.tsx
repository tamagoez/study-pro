import { Container, Box, Text, Button, IconButton } from "@chakra-ui/react";
import Layout from "../../components/Layout";
import { IndexClockTable } from "../../components/clock/checktable";
import { useEffect, useState } from "react";
import { getNowClock } from "../../scripts/clock";
import { calcMinutesToDHM } from "../../utils/datetime";
import { zeroPad } from "../../utils/number";
import { CircularProgressbar } from "react-circular-progressbar";

export default function ClockIndex() {
  const [nowH, setNowH] = useState("00");
  const [nowM, setNowM] = useState("00");
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const fetchClock = async () => {
      const data = await getNowClock();
      const splitTime = calcMinutesToDHM(data.studymin);
      const splitHours = zeroPad(splitTime.hours, 2);
      const splitMinutes = zeroPad(splitTime.minutes, 2);
      setNowH(splitHours);
      setNowM(splitMinutes);
    };
    fetchClock();
  }, []);
  return (
    <Layout titleprop="勉強時計">
      <Container
        centerContent
        width={0.8}
        boxShadow="md"
        rounded="md"
        borderColor="white"
        padding="50"
        borderWidth={1}
        marginTop={0}
        marginBottom={0}
        backgroundColor="gray.50"
      >
        <div style={{ width: 100, height: 100 }}>
          <CircularProgressbar
            value={25}
            text={Number(nowH) + Number(nowM) / 60 + "h"}
          />
        </div>
        <div style={{ width: 100, height: 100 }}>
          <CircularProgressbar
            value={50}
            text={Number(nowH) + Number(nowM) / 60 + "h"}
          />
        </div>
        <div style={{ width: 100, height: 100 }}>
          <CircularProgressbar
            value={75}
            text={Number(nowH) + Number(nowM) / 60 + "h"}
          />
        </div>
      </Container>
      <IconButton aria-label="タスクを追加する" />
      <IconButton aria-label="タスクテーブルを編集する" />
      <IndexClockTable />
    </Layout>
  );
}
