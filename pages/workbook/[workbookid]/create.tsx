import { Button, Container, Input, Select, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { createSection } from "../../../scripts/workbook/section/page/page";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import { splitUrl } from "../../../scripts/common/url";

export default function SectionCreate() {
  const router = useRouter();
  const [sectionName, setSectionName] = useState("");
  const [sectionSubtitle, setSectionSubtitle] = useState("");
  const [sectionSubject, setSectionSubject] = useState<number>();
  const [workbookId, setWorkbookId] = useState<number | null>(null);
  useEffect(() => {
    setWorkbookId(splitUrl(location.pathname, 2));
  }, []);

  async function createSectionButton() {
    const returnid = await createSection(
      sectionName,
      sectionSubtitle,
      workbookId,
      sectionSubject
    );
    router.replace(`/workbook/${workbookId}/${returnid}/edit`);
  }
  return (
    <Layout titleprop="ワークブックを作成">
      <Container centerContent width="0.7">
        <Text>セクション名</Text>
        <Input onChange={(e) => setSectionName(e.target.value)}></Input>
        <Text>サブタイトル</Text>
        <Input onChange={(e) => setSectionSubtitle(e.target.value)}></Input>
        <Select placeholder="教科を選択">
          <option value={1}>英語</option>
          <option value={2}>数学</option>
          <option value={3}>国語</option>
          <option value={4}>理科</option>
          <option value={5}>社会</option>
          <option value={6}>保健体育</option>
          <option value={7}>技術</option>
          <option value={8}>家庭科</option>
          <option value={9}>音楽</option>
          <option value={0}>その他</option>
        </Select>
        <Button
          disabled={!sectionName || !sectionSubtitle}
          onClick={() => createSectionButton()}
        >
          作成する
        </Button>
        <p>作成後、自動的に編集ページに移動します</p>
      </Container>
    </Layout>
  );
}
