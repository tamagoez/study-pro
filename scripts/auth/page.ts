import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { Provider } from "@supabase/supabase-js";
import { toastError, toastSuccess } from "../../components/toast/toast";
// import { ToastProp } from "../../interfaces/toast/toast";
const supabase = createPagesBrowserClient();

export async function emailAuth(
  type: "login" | "signup",
  email: string,
  password: string
) {
  if (type === "login") await emailLogin(email, password);
  if (type === "signup") await emailSignup(email, password);
}

async function emailLogin(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    console.error(error);
    toastError(error.message);
  }
  toastSuccess("ログインしました!");
}

async function emailSignup(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  if (error) {
    console.error(error);
    toastError(error.message);
  }
  toastSuccess("メールを確認してください");
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return;
  } catch (error) {
    console.error(error);
  }
}
