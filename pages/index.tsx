import Link from "next/link";
import Layout from "../components/Layout";
import { Divider, Heading, ListItem, UnorderedList } from "@chakra-ui/react";

const APP_TITLE = "StudySharp";

const IndexPage = () => (
  <Layout titleprop="トップページ">
    <Heading as="h1" size="xl">
      {APP_TITLE}
    </Heading>
    <Heading as="h4" size="md">
      勉強に燃えよう
    </Heading>
    <Divider marginY="20px" />
    <div>
      <Heading as="h5" size="sm">
        どのようなことができるようになる予定か
      </Heading>
      <UnorderedList>
        <ListItem>Todoタスクを管理できます</ListItem>
        <ListItem>勉強時間を記録できます</ListItem>
        <ListItem>自分だけの問題集を作れます</ListItem>
        <ListItem>お互いで励ましあえます</ListItem>
      </UnorderedList>
    </div>
  </Layout>
);

export default IndexPage;
