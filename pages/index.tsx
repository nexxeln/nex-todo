import { Header, Title } from "@mantine/core";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Header height="">
      <Title order={1} align="center">
        NEX TODO
      </Title>
    </Header>
  );
};

export default Home;
