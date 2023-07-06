import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../../../components/Layout";
import { PageEditTable } from "../../../../../components/workbook/section/page/edit";
import { splitUrl } from "../../../../../scripts/common/url";

export default function WorkbookPageEdit() {
  const router = useRouter();
  const [pageId, setPageId] = useState<number | undefined>(undefined);

  useEffect(() => {
    const url = location.pathname;
    setPageId(splitUrl(url, 4));
  }, []);

  return (
    <Layout titleprop="ページを編集">
      <PageEditTable pageid={pageId} />
    </Layout>
  );
}
