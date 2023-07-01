import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../../components/Layout";
import { SectionEditTable } from "../../../../components/workbook/section/edit";

export default function WorkbookSectionEdit() {
  const router = useRouter();
  const { sectionid } = router.query;
  let sectionId;
  if (typeof sectionid === "number") {
    sectionId = sectionid;
  }

  return (
    <Layout titleprop="セクションを編集">
      <SectionEditTable sectionid={sectionId} />
    </Layout>
  );
}
