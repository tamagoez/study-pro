import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  StackDivider,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { MdEmail, MdPassword } from "react-icons/md";
import { emailAuth } from "../scripts/auth/page";
import { useRouter } from "next/router";

export default function Auth() {
  // 関数関係の初期設定
  const [authtype, setAuthtype] = useState<"login" | "signup">("login");
  const [moveTo, setMoveTo] = useState("/dashboard");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const toast = useToast();

  // ウィンドウ読み込み
  useEffect(() => {
    // URL変数を確認する
    const params = new URLSearchParams(location.search);
    const initmode = params.get("mode");
    const initmoveto = params.get("moveto");
    if (initmode === ("login" || "signup")) setAuthtype(initmode);
    if (initmoveto) setMoveTo(initmoveto);
  }, []);

  // Authプロセスの実行
  async function authExec() {
    try {
      await emailAuth(authtype, email, password);
      location.replace(`/callback?moveto=${moveTo}`);
    } catch (err) {}
  }

  return (
    <>
      <Layout
        titleprop={
          authtype[0].toUpperCase() + authtype.substring(1, authtype.length)
        }
        showfooter={false}
      >
        <Container>
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<MdEmail color="gray.300" />}
              />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<MdPassword color="gray.300" />}
              />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
          </FormControl>
          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={2}
            align="stretch"
            marginTop="30px"
          >
            <Button
              onClick={() =>
                setAuthtype(authtype === "login" ? "signup" : "login")
              }
            >
              {authtype !== "login" ? "ログイン" : "新規登録"}に切り替える
            </Button>
            <Button onClick={() => {}}>
              {authtype === "login" ? "ログイン" : "新規登録"}
            </Button>
          </VStack>
        </Container>
      </Layout>
    </>
  );
}
