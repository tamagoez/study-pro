import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../../components/Layout";
import { SectionEditTable } from "../../../../components/workbook/section/edit";

export default function WorkbookSectionEdit() {
  const router = useRouter();
  const [sectionId, setSectionId] = useState<number | undefined>(undefined);

  // const { sectionid } = router.query;
  // const sectionId = typeof sectionid === "string" ? parseInt(sectionid) : null;
  useEffect(() => {
    const url = location.pathname;
    const segments = url.split("/");
    setSectionId(parseInt(segments[3]));
    console.log(segments);
  });

  return (
    <Layout titleprop="セクションを編集">
      <SectionEditTable sectionid={sectionId} />
    </Layout>
  );
}
