import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { Session } from "@supabase/gotrue-js";
import { supabase } from "../utils/supabaseClient";
import Auth from "../components/Auth";
import App from "../components/App";
import Header from "../components/Header";

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
      <Head>
        <title>nex todo</title>
      </Head>
      <Header />
      {!session ? <Auth /> : <App />}
    </>
  );
};

export default Home;
