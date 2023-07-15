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
import { toastError, toastSuccess } from "../components/toast/toast";
import { FcGoogle } from "react-icons/fc";

export default function Auth() {
  // 関数関係の初期設定
  const [authtype, setAuthtype] = useState<"login" | "signup">("login");
  const [moveTo, setMoveTo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // ウィンドウ読み込み
  useEffect(() => {
    // URL変数を確認する
    const params = new URLSearchParams(location.search);
    const paramMoveto = params.get("moveto");
    setMoveTo(paramMoveto);
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
    const res = await emailAuth(authtype, email, password);
    if (res === true) {
      router.replace(`/callback?moveTo=${moveTo}`);
    }
  }

  // login/signupは同一ページ内の移動のため、shallow routingで移動することで、ネットワークにアクセスしないでURLを変える
  return (
    <>
      <Layout
        titleprop={
          authtype[0].toUpperCase() + authtype.substring(1, authtype.length)
        }
        showfooter={false}
      >
        <Container centerContent width="0.7">
          <Button leftIcon={<FcGoogle />}>Google</Button>
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
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
