import { useState, useEffect } from "react";
import { Button, Input, List } from "@mantine/core";
import { RiInputCursorMove } from "react-icons/ri";
import { GrFormAdd } from "react-icons/gr";
import { supabase } from "../../utils/supabaseClient";
import Alert from "./Alert";
import Todo from "./Todo";

const Todos = ({ user }) => {
  const [todos, setTodos] = useState([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [errorText, setError] = useState("");

  const fetchTodos = async () => {
    let { data: todos, error } = await supabase
      .from("todos")
      .select("*")
      .order("id", true);

    if (error) console.log("error", error);
    else setTodos(todos);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (taskText: string) => {
    let task = taskText.trim();
    if (task.length) {
      let { data: todo, error } = await supabase
        .from("todos")
        .insert({ task, user_id: user.id })
        .single();
      if (error) setError(error.message);
      else setTodos([...todos, todo]);
    }
  };

  const deleteTodo = async (id: any) => {
    try {
      await supabase.from("todos").delete().eq("id", id);
      setTodos(todos.filter((x) => x.id != id));
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <Input
        icon={<RiInputCursorMove />}
        placeholder="Type todo here"
        onChange={(e) => {
          setError("");
          setNewTaskText(e.target.value);
        }}
      />
      <Button
        leftIcon={<GrFormAdd />}
        color="cyan"
        uppercase
        onClick={() => addTodo(newTaskText)}
      >
        add
      </Button>

      {!!errorText && <Alert text={errorText} />}

      <List>
        {todos.map((todo) => (
          <List.Item key={todo.id}>
            <Todo todo={todo} onDelete={() => deleteTodo(todo.id)} />
          </List.Item>
        ))}
      </List>
    </>
  );
};

export default Todos;
