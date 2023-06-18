import Layout from "../components/Layout";
import { DashboardCard } from "../components/dashboard/card";

interface DashboardItem {
  title: string;
  description: string;
  url: string;
}

const menuItem: DashboardItem[] = [
  {
    title: "ワークブック",
    description: "自分やその他のユーザーが作った問題集で学習しよう",
    url: "/workbook",
  },
];

export default function Dashboard() {
  return (
    <>
      <Layout titleprop="ダッシュボード">
        <p>ダッシュボード</p>
        {menuItem.map((x) => (
          <DashboardCard
            key={x.url}
            title={x.title}
            description={x.description}
            url={x.url}
          />
        ))}
      </Layout>
    </>
  );
}
