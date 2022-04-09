import { supabase } from "./supabaseClient";

export const fetchTodos = async () => {
  let { data: todos, error } = await supabase
    .from("todos")
    .select("*")
    .order("id", true);

  if (error) console.log(error);
  else return todos;
};

export const addTodo = async (taskText: string, user_id: any) => {
  let task = taskText.trim();

  if (task.length) {
    let { data: todo, error } = await supabase
      .from("todos")
      .insert({ task, user_id: user_id })
      .single();

    if (error) return error.message;
    else return todo;
  }
};
