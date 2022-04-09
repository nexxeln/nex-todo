import type { NextPage } from "next";
import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { Header, Title } from "@mantine/core";
import { supabase } from "../utils/supabaseClient";
import Auth from "../components/Auth";
import { Session } from "@supabase/gotrue-js";

type sessionState = [Session | null, Dispatch<SetStateAction<Session | null>>];

const Home: NextPage = () => {
  const [session, setSession]: sessionState = useState(null as Session | null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <>
      <Header height="">
        <Title order={1} align="center">
          NEX TODO
        </Title>
      </Header>
      {!session && <Auth />}
    </>
  );
};

export default Home;
