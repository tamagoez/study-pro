import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";

export default function WorkbookEdit() {
  const router = useRouter();
  const { workbookid } = router.query;

  const [workbookId, setWorkbookId] = useState(workbookid);
  return <Layout titleprop="ワークブックを編集">{workbookId}</Layout>;
}
