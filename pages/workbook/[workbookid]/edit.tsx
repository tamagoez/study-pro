import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import { SectionCard } from "../../../components/workbook/section/card";
import { fetchSections } from "../../../scripts/workbook/section/sections";

export default function WorkbookEdit() {
  const router = useRouter();
  const { workbookid } = router.query;

  const [workbookId, setWorkbookId] = useState("");
  if (typeof workbookid === "string") {
    setWorkbookId(workbookid);
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

  return (
    <Layout titleprop="ワークブックを編集">
      <p>閲覧モード</p>
      {sectionItems.map((x) => (
        <SectionCard
          id={x.id}
          title={x.title}
          subtitle={x.subtitle}
          url={x.url}
          own={true}
          subject={x.subject}
          editmode={false}
        />
      ))}
      <p>編集モード</p>
      {sectionItems.map((x) => (
        <SectionCard
          id={x.id}
          title={x.title}
          subtitle={x.subtitle}
          url={x.url}
          own={true}
          subject={x.subject}
          editmode={true}
        />
      ))}
    </Layout>
  );
}
