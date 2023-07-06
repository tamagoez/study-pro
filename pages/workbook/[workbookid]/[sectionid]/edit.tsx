import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../../components/Layout";
import { FormControl, FormLabel, Switch } from "@chakra-ui/react";
import { splitUrl } from "../../../../scripts/common/url";
import { PageCard } from "../../../../components/workbook/section/page/card";
import { fetchPages } from "../../../../scripts/workbook/section/page/pages";

export default function SectionEdit() {
  const router = useRouter();
  // router.queryがポンコツなのでuseEffectで疑似的に作る
  const [workbookId, setWorkbookId] = useState<number | undefined>(undefined);
  const [sectionId, setSectionId] = useState<number | undefined>(undefined);

  const [loading, setLoading] = useState(true);
  const [pageItems, setPageItems] = useState([]);
  useEffect(() => {
    const url = location.pathname;
    const wId = splitUrl(url, 3);
    setSectionId(wId);
    setWorkbookId(splitUrl(url, 2));
    const fetchData = async () => {
      setPageItems(await fetchPages(wId));
      setLoading(false);
    };
    fetchData();
  }, []);

  // !! 仮で作った雑魚システム
  const [editmode, setEditmode] = useState(false);
  return (
    <Layout titleprop="セクションを編集">
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="edit-mode" mb="0">
          {!editmode ? "閲覧モード" : "編集モード"}
        </FormLabel>
        <Switch
          id="edit-mode"
          checked={editmode}
          onChange={(e) => setEditmode(e.target.checked)}
        />
      </FormControl>
      <PageCard
        id="create"
        title="新規作成"
        subtitle="新しいページを作成する"
        url="create"
        own={false}
        subject={0}
        editmode={false}
        workbookid={workbookId}
        sectionid={sectionId}
      />
      {pageItems.map((x) => (
        <PageCard
          id={x.id}
          title={x.title}
          subtitle={x.subtitle}
          url={x.url}
          own={true}
          subject={x.subject}
          editmode={editmode}
          workbookid={workbookId}
          sectionid={sectionId}
        />
      ))}
    </Layout>
  );
}
