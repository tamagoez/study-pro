import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { toastError, toastSuccess } from "../../components/toast/toast";
import { TodoInterface } from "../../interfaces/todo";
import { useUser } from "@supabase/auth-helpers-react";

const supabase = createPagesBrowserClient();

export async function setTaskDone(id: string, value: boolean) {
  const { error } = await supabase
    .from("task")
    .update({ done: value })
    .eq("id", id);
  if (error) {
    toastError(error.message);
  } else {
    toastSuccess(
      "タスクを" + (value ? "実行済み" : "未実行") + "に変更しました"
    );
  }
}

export async function insertTask(
  title: string,
  limit: string,
  done: boolean,
  description?: string
) {
  const user = useUser();
  const { data, error } = await supabase
    .from("task")
    .insert({ title, description, limit, done, user: user.id })
    .select()
    .single();
  if (error) {
    toastError(error.message);
    return new Error();
  } else {
    toastSuccess("${title} を追加しました");
    return data;
  }
}

export async function selectTask(): Promise<TodoInterface[]> {
  console.log("called");
  const user = useUser();
  const { data, error } = await supabase
    .from("task")
    .select("id, title, description, limit, done")
    .eq("userid", user.id);
  if (error) {
    console.error(error);
    toastError(error.message);
    return [];
  } else {
    return data;
  }
}
