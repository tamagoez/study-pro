import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import { SectionCard } from "../../../components/workbook/section/card";
import { fetchSections } from "../../../scripts/workbook/section/sections";
import { FormControl, FormLabel, Switch } from "@chakra-ui/react";
import { splitUrl } from "../../../scripts/common/url";

export default function WorkbookEdit() {
  const router = useRouter();
  // router.queryがポンコツなのでuseEffectで疑似的に作る
  const [workbookId, setWorkbookId] = useState<number | undefined>(undefined);

  const [loading, setLoading] = useState(true);
  const [sectionItems, setSectionItems] = useState([]);
  useEffect(() => {
    const url = location.pathname;
    const wId = splitUrl(url, 2);
    setWorkbookId(wId);
    const fetchData = async () => {
      setSectionItems(await fetchSections(wId));
      setLoading(false);
    };
    fetchData();
  }, []);

  // !! 仮で作った雑魚システム
  const [editmode, setEditmode] = useState(true);
  return (
    <Layout titleprop="ワークブックを編集">
      <SectionCard
        id="create"
        title="新規作成"
        subtitle="新しいセクションを作成する"
        url="create"
        own={false}
        subject={0}
        editmode={false}
        workbookid={workbookId}
      />
      {sectionItems.map((x) => (
        <SectionCard
          id={x.id}
          title={x.title}
          subtitle={x.subtitle}
          url={x.url}
          own={true}
          subject={x.subject}
          editmode={editmode}
          workbookid={workbookId}
        />
      ))}
    </Layout>
  );
}
