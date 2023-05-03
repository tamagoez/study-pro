import Link from "next/link";
import Layout from "../components/Layout";
import { Divider, Heading } from "@chakra-ui/react";

const IndexPage = () => (
  <Layout titleprop="Stupper トップページ">
    <Heading as="h1" size="xl">
      Stupper
    </Heading>
    <Heading as="h3" size="md">
      あなたの勉強のお供をします
    </Heading>
    <Divider marginY="20px" />
    <div>
      <Heading as="h4" size="sm">
        どのようなことができるか
      </Heading>
      <p>実は恥ずかしながら、現状何もできません。</p>
    </div>
  </Layout>
);

export default IndexPage;
