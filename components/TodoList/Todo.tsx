import { useState } from "react";
import { List, ThemeIcon } from "@mantine/core";
import { BsPatchCheckFill } from "react-icons/bs";
import { BiLoader } from "react-icons/bi";
import { supabase } from "../../utils/supabaseClient";

const Todo = ({ todo, onDelete }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const toggle = async () => {
    try {
      const { data, error } = await supabase
        .from("todos")
        .update({ is_complete: !isCompleted })
        .eq("id", todo.id)
        .single();

      if (error) {
        throw new Error(error.toString());
      }

      setIsCompleted(data.is_complete);
    } catch (error) {
      console.log("error", error);
    }
  };

  return <div>Todo</div>;
};

export default Todo;
