import { useState } from "react";
import Layout from "../components/Layout";

interface TodoInterface {
  title: string;
  description: string;
  done: boolean;
}

export default function TodoPage() {
  const [tododata, setTododata] = useState<TodoInterface[]>([]);

  return (
    <Layout titleprop="Todo">
      <p>Todoリスト</p>
    </Layout>
  );
}
