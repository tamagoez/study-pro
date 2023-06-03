import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { Provider } from "@supabase/supabase-js";
import { toastError, toastSuccess } from "../../components/toast/toast";
import { useRouter } from "next/router";
// import { ToastProp } from "../../interfaces/toast/toast";
const supabase = createPagesBrowserClient();

export async function emailAuth(
  type: "login" | "signup",
  email: string,
  password: string
) {
  let res;
  if (type === "login") res = await emailLogin(email, password);
  if (type === "signup") await emailSignup(email, password);
  if (res) return true;
}

async function emailLogin(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    console.error(error);
    toastError(error.message);
  } else {
    toastSuccess("ログインしました!");
    return true;
  }
}

async function emailSignup(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      emailRedirectTo: `${location.hostname}/callback`,
    },
  });
  if (error) {
    console.error(error);
    toastError(error.message);
  }
  toastSuccess("メールを確認してください");
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error);
    toastError(error.message);
    return false;
  }
  return true;
}
