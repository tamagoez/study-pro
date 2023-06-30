import Link from "next/link";
import Layout from "../components/Layout";
import { Divider, Text } from "@chakra-ui/react";

const APP_TITLE = "StudySharp";

const IndexPage = () => (
  <Layout titleprop="トップページ">
    <Text style={{ marginBottom: 0 }}>{APP_TITLE}</Text>
    <Text size={"md"} style={{ margin: 0 }}>
      勉強に燃えよう
    </Text>
    <Divider />
    <div>
      <Text size={"md"}>どのようなことができるようになる予定か</Text>
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
