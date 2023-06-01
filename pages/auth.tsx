import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { MdEmail, MdPassword } from "react-icons/md";
import { emailAuth } from "../scripts/auth/page";
import { useRouter } from "next/router";
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";

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
    // const initmode = params.get("initmode");
    const initmoveto = params.get("moveto");
    // if (initmode == ("login" || "signup")) setAuthtype(initmode);
    // console.log(initmode);
    // if (initmoveto) setMoveTo(initmoveto);
  }, [router]);

  useEffect(() => {
    if (
      router.query.mode &&
      (router.query.mode === "login" || router.query.mode === "signup")
    ) {
      setAuthtype(router.query.mode);
    }
  }, [router.query.mode]);

  // Authプロセスの実行
  async function authExec() {
    try {
      await emailAuth(authtype, email, password);
      location.replace(`/callback?moveto=${moveTo}`);
    } catch (err) {}
  }

  async function buttonHandle() {
    const result = await emailAuth(authtype, email, password);
  }

  // login/signupは同一ページ内の移動のため、shallow routingで移動することで、ネットワークにアクセスしないでURLを変える
  // const [form] = Form.useForm();
  return (
    <>
      <Layout
        titleprop={
          authtype[0].toUpperCase() + authtype.substring(1, authtype.length)
        }
        showfooter={false}
      >
        <Container centerContent width="0.7">
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Stack direction="row" spacing={4} align="center" mt="5">
            <Button
              colorScheme="teal"
              onClick={() => {
                buttonHandle();
              }}
            >
              {authtype === "login" ? "ログイン" : "新規登録"}
            </Button>
            <Button
              colorScheme="gray"
              onClick={() =>
                setAuthtype(authtype === "login" ? "signup" : "login")
              }
            >
              {authtype === "login" ? "新規登録" : "ログイン"}に切り替え
            </Button>
          </Stack>
        </Container>
      </Layout>
    </>
  );
}
