import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { MdEmail, MdPassword } from "react-icons/md";
import { emailAuth } from "../scripts/auth/page";
import { useRouter } from "next/router";
import {
  Button,
  Col,
  Form,
  FormInstance,
  Input,
  Row,
  Space,
  Typography,
} from "antd";
const { Title } = Typography;

export default function Auth() {
  // 関数関係の初期設定
  const [authtype, setAuthtype] = useState<"login" | "signup">("login");
  const [moveTo, setMoveTo] = useState("/dashboard");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // ウィンドウ読み込み
  useEffect(() => {
    // URL変数を確認する
    const params = new URLSearchParams(location.search);
    const initmode = params.get("initmode");
    const initmoveto = params.get("moveto");
    if (initmode == ("login" || "signup")) setAuthtype(initmode);
    console.log(initmode);
    // if (initmoveto) setMoveTo(initmoveto);
  }, [router]);

  // Authプロセスの実行
  async function authExec() {
    try {
      await emailAuth(authtype, email, password);
      location.replace(`/callback?moveto=${moveTo}`);
    } catch (err) {}
  }

  const [form] = Form.useForm();
  return (
    <>
      <Layout
        titleprop={
          authtype[0].toUpperCase() + authtype.substring(1, authtype.length)
        }
        showfooter={false}
      >
        <Row justify="center">
          <Col flex="100px"></Col>
          <Col flex="auto" style={{ textAlign: "center" }}>
            <Title level={2} style={{ marginTop: "30px" }}>
              {authtype[0].toUpperCase() +
                authtype.substring(1, authtype.length)}
            </Title>
            <Form
              form={form}
              name="validateOnly"
              layout="vertical"
              autoComplete="off"
              style={{ marginTop: "10px" }}
            >
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true }]}
              >
                <Input.Password placeholder="input password" />
              </Form.Item>
              <Form.Item>
                <Space>
                  <SubmitButton
                    form={form}
                    text={authtype === "login" ? "ログイン" : "新規登録"}
                  />
                  <Button
                    onClick={() =>
                      setAuthtype(authtype === "login" ? "signup" : "login")
                    }
                  >
                    {authtype !== "login" ? "ログイン" : "新規登録"}に切り替え
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Col>
          <Col flex="100px"></Col>
        </Row>
      </Layout>
    </>
  );
}

const SubmitButton = ({ form, text }: { form: FormInstance; text: string }) => {
  const [submittable, setSubmittable] = useState(false);

  // Watch all values
  const values = Form.useWatch([], form);

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      }
    );
  }, [values]);

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      {text}
    </Button>
  );
};
