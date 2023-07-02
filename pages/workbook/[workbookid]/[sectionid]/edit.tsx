import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../../components/Layout";
import { SectionEditTable } from "../../../../components/workbook/section/edit";
import { splitUrl } from "../../../../scripts/common/url";

export default function WorkbookSectionEdit() {
  const router = useRouter();
  const [sectionId, setSectionId] = useState<number | undefined>(undefined);

  useEffect(() => {
    const url = location.pathname;
    setSectionId(splitUrl(url, 3));
  }, []);

  return (
    <Layout titleprop="セクションを編集">
      <SectionEditTable sectionid={sectionId} />
    </Layout>
  );
}
