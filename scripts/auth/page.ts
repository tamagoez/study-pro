import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { Provider } from "@supabase/supabase-js";
// import { ToastProp } from "../../interfaces/toast/toast";
const supabase = createPagesBrowserClient();

export async function emailAuth(
  type: "login" | "signup",
  email: string,
  password: string
) {
  let result;
  if (type === "login") result = await emailLogin(email, password);
  if (type === "signup") result = await emailSignup(email, password);
  return result;
}

async function emailLogin(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    console.error(error);
    return { status: "error", description: error.message };
  }
  return { status: "success" };
}

async function emailSignup(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  if (error) {
    console.error(error);
    return { status: "error", description: error.message };
  }
  return { status: "success", description: "メールを確認してください" };
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
