import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../../components/Layout";

export default function WorkbookSectionEdit() {
  const router = useRouter();
  const { sectionid } = router.query;

  const [sectionId, setSectionId] = useState(sectionid);
  return <Layout titleprop="セクションを編集">{sectionId}</Layout>;
}
