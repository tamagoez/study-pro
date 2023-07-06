import { Button, Container, Input, Select, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { createPage } from "../../../../scripts/workbook/section/page/page";
import { useRouter } from "next/router";
import Layout from "../../../../components/Layout";
import { splitUrl } from "../../../../scripts/common/url";

export default function PageCreate() {
  const router = useRouter();
  const [pageName, setPageName] = useState("");
  const [pageSubtitle, setPageSubtitle] = useState("");
  // const [sectionSubject, setSectionSubject] = useState<number>();
  const [workbookId, setWorkbookId] = useState<number | null>(null);
  const [sectionId, setSectionId] = useState<number | null>(null);
  useEffect(() => {
    setSectionId(splitUrl(location.pathname, 3));
    setWorkbookId(splitUrl(location.pathname, 2))
  }, []);

  async function createPageButton() {
    const returnid = await createPage(pageName, pageSubtitle, sectionId);
    router.replace(`/workbook/${workbookId}/${sectionId}/${returnid}/edit`);
  }
  return (
    <Layout titleprop="ページを作成">
      <Container centerContent width="0.7">
        <Text>セクション名</Text>
        <Input onChange={(e) => setPageName(e.target.value)}></Input>
        <Text>サブタイトル</Text>
        <Input onChange={(e) => setPageSubtitle(e.target.value)}></Input>
        <Button
          disabled={!pageName || !pageSubtitle}
          onClick={() => createPageButton()}
        >
          作成する
        </Button>
        <p>作成後、自動的に編集ページに移動します</p>
      </Container>
    </Layout>
  );
}
