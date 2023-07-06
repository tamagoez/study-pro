import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Text, Heading } from "@chakra-ui/react";
import { splitUrl } from "../../scripts/common/url";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { fetchNewsContent } from "../../scripts/news/page";

export default function NewsIndex() {
  const [newsId, setNewsId] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [newsTitle, setNewsTitle] = useState("");
  const [newsContent, setNewsContent] = useState("");
  const [newsCreatedAt, setNewsCreatedAt] = useState("");
  useEffect(() => {
    const fetchNews = async () => {
      const url = location.pathname;
      const nId = splitUrl(url, 2);
      setNewsId(nId);
      const data = await fetchNewsContent(nId);
      setNewsTitle(data.title);
      setNewsContent(data.content);
      setNewsCreatedAt(data.created_at);
      setLoading(false);
    };
    fetchNews();
  }, []);
  return (
    <Layout titleprop={`ニュース: ${newsTitle}`}>
      {loading ? <Heading fontSize="lg">読み込み中...</Heading> : null}
      <Heading fontSize="md">{newsTitle}</Heading>
      <Text>{newsCreatedAt}</Text>
      <br />
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
        {newsContent}
      </ReactMarkdown>
    </Layout>
  );
}
