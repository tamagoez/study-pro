import { Badge, Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchMyWorkbooks } from "../../scripts/workbook/books";
import Layout from "../../components/Layout";
import { WorkbookCard } from "../../components/workbook/card";

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
      <Text>あなたが作成したワークブック</Text>
      {myWorkbooks.map((x) => (
        <WorkbookCard
          title={x.title}
          subtitle={x.subtitle}
          ownerid={x.ownerid}
          own={true}
          id={x.id}
          subject={x.subject}
        />
      ))}
    </Layout>
  );
}
