import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { fetchNewsList } from "../../scripts/news";
import { NewsCard } from "../../components/news/card";

export default function NewsIndex() {
  const [newsItem, setNewsItem] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchNews = async () => {
      const data = await fetchNewsList();
      setNewsItem(data);
      setLoading(false);
    };
    fetchNews();
  }, []);
  return (
    <Layout titleprop="ニュース">
      {newsItem.map((x) => (
        <NewsCard
          title={x.title}
          id={x.id}
          created_at={x.created_at}
          key={x.key}
        />
      ))}
    </Layout>
  );
}
