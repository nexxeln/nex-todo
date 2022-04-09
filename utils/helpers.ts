import { supabase } from "./supabaseClient";

const fetchTodos = async () => {
  let { data: todos, error } = await supabase
    .from("todos")
    .select("*")
    .order("id", true);

  if (error) console.log(error);
  else return todos;
};
