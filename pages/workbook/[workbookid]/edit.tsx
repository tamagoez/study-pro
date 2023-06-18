import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import { SectionCard } from "../../../components/workbook/section/card";
import { fetchSections } from "../../../scripts/workbook/section/sections";
import { FormControl, FormLabel, Switch } from "@chakra-ui/react";

export default function WorkbookEdit() {
  const router = useRouter();
  const { workbookid } = router.query;

  let workbookId;
  if (typeof workbookid === "string") {
    workbookId = workbookid;
  }
  const [loading, setLoading] = useState(true);
  const [sectionItems, setSectionItems] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setSectionItems(await fetchSections(workbookId));
      setLoading(false);
    };

    fetchData();
  }, []);

  // !! 仮で作った雑魚システム
  const [editmode, setEditmode] = useState(false);
  return (
    <Layout titleprop="ワークブックを編集">
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="edit-mode" mb="0">
          {editmode ? "閲覧モード" : "編集モード"}
        </FormLabel>
        <Switch
          id="edit-mode"
          checked={editmode}
          onChange={(e) => setEditmode(e.target.checked)}
        />
      </FormControl>
      {sectionItems.map((x) => (
        <SectionCard
          id={x.id}
          title={x.title}
          subtitle={x.subtitle}
          url={x.url}
          own={true}
          subject={x.subject}
          editmode={editmode}
        />
      ))}
    </Layout>
  );
}
