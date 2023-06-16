import { Badge, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchMyWorkbooks } from "../../scripts/workbook/books";
import Layout from "../../components/Layout";

export default function WorkbookIndex() {
  const [loading, setLoading] = useState(true);
  const [myWorkbooks, setMyWorkbooks] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setMyWorkbooks(await fetchMyWorkbooks());
      setLoading(false);
    };

    fetchData();
  }, []);

  // 自分が作成したワークブック、解いたワークブックを表示する
  return (
    <Layout titleprop="ワークブック一覧">
      {loading ? <p>loading...</p> : null}
      {myWorkbooks.map((x) => (
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Box p="6">
            <Box display="flex" alignItems="baseline">
              <Badge borderRadius="full" px="2" colorScheme="teal">
                Own
              </Badge>
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                ml="2"
              >
                Made by @{x.id}
              </Box>
            </Box>

            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              noOfLines={1}
            >
              {x.title}
            </Box>

            <Box>{x.subtitle}</Box>
          </Box>
        </Box>
      ))}
    </Layout>
  );
}
