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
  useEffect(() => {
    const fetchData = async () => {
      const data = await getNowClock();
      const splitTime = calcMinutesToDHM(data.studymin);
      const splitHours = zeroPad(splitTime.hours, 2);
      const splitMinutes = zeroPad(splitTime.minutes, 2);
      setNowH(splitHours);
      setNowM(splitMinutes);
    };
    fetchData();
  }, []);
  return (
    <Layout titleprop="勉強時計">
      <Container centerContent width={0.8} backgroundColor="gray" padding="50">
        <Text>
          {nowH}h {nowM}m
        </Text>
      </Container>
      <IndexClockTable />
    </Layout>
  );
}
