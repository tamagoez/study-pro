import { Container, Box, Text } from "@chakra-ui/react";
import Layout from "../../components/Layout";
import { IndexClockTable } from "../../components/clock/checktable";
import { useEffect, useState } from "react";
import { getNowClock } from "../../scripts/clock";
import { calcMinutesToDHM } from "../../utils/datetime";
import { zeroPad } from "../../utils/number";

export default function ClockIndex() {
  const [nowH, setNowH] = useState("00");
  const [nowM, setNowM] = useState("00");
  const [tasks, setTasks] = useState([])
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
        marginTop={50}
        marginBottom={50}
      >
        <Text textAlign="center" fontSize="2xl">
          {nowH}h {nowM}m
        </Text>
      </Container>
      <IndexClockTable />
    </Layout>
  );
}
