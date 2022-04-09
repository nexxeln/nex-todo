import type { NextPage } from "next";
import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { Header, Title } from "@mantine/core";
import { Session } from "@supabase/gotrue-js";
import { supabase } from "../utils/supabaseClient";
import Auth from "../components/Auth";
import App from "../components/App";

type sessionState = [Session | null, Dispatch<SetStateAction<Session | null>>];

const Home: NextPage = () => {
  const [session, setSession]: sessionState = useState(null as Session | null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  console.log("session", session);
  return (
    <>
      <Header height="">
        <Title order={1} align="center">
          NEX TODO
        </Title>
      </Header>
      {!session ? <Auth /> : <App />}
    </>
  );
};

export default Home;
