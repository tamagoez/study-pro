import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { Provider } from "@supabase/supabase-js";
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
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) throw error;
    return true;
  } catch (error: any) {
    console.error(error.message);
    // alert(error.message);
    throw new Error(error.message);
  }
}

async function emailSignup(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) throw error;
    return true;
  } catch (error: any) {
    console.error(error.message);
    // alert(error.message);
    throw new Error(error.message);
  }
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
