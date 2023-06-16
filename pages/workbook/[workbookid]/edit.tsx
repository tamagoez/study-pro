import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";

export default function WorkbookEdit() {
  const router = useRouter();
  const { query, isReady } = useRouter();

  const [workbookId, setWorkbookId] = useState("");

  useEffect(() => {
    if (typeof query.workbookId === "string") {
      setWorkbookId(query.workbookId);
    }
    console.log(workbookId);
  }, [isReady, query.workbookId]);

  return <Layout titleprop="ワークブックを編集">{workbookId}</Layout>;
}
