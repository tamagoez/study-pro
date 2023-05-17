import Link from "next/link";
import Layout from "../components/Layout";

import { Typography, Divider } from "antd";
const { Title } = Typography;

const APP_TITLE = "StudySharp";

const IndexPage = () => (
  <Layout titleprop="トップページ">
    <Title style={{ marginBottom: 0 }}>{APP_TITLE}</Title>
    <Title level={4} style={{ margin: 0 }}>
      勉強に燃えよう
    </Title>
    <Divider />
    <div>
      <Title level={5}>
        どのようなことができるようになる予定か
      </Title>
      <ul>
        <li>Todoタスクを管理できます</li>
        <li>勉強時間を記録できます</li>
        <li>自分だけの単語帳/問題集を作れます</li>
        <li>お互いで励ましあえます</li>
      </ul>
    </div>
  </Layout>
);

export default IndexPage;
