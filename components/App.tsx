import { Title } from "@mantine/core";
import Todos from "./TodoList/Todos";

const App = ({ user }) => {
  return <Todos user={user} />;
};

export default App;
