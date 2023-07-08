import { Box, Text } from "@chakra-ui/react";
import Layout from "../../components/Layout";
import { IndexClockTable } from "../../components/clock/checktable";

export default function ClockIndex() {
  return (
    <Layout titleprop="勉強時計">
      <Box>
        <Text>00h 00m</Text>
      </Box>
      <IndexClockTable />
    </Layout>
  );
}
