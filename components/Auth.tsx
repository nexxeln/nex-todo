import { useState } from "react";
import {
  TextInput,
  Paper,
  Title,
  Text,
  Container,
  Alert,
  Button,
} from "@mantine/core";
import { supabase } from "../utils/supabaseClient";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (email: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      setLoaded(true);
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  //   return (
  //     <div className="row flex flex-center">
  //       <div className="col-6 form-widget">
  //         <h1 className="header">Supabase + Next.js</h1>
  //         <p className="description">
  //           Sign in via magic link with your email below
  //         </p>
  //         <div>
  //           <input
  //             className="inputField"
  //             type="email"
  //             placeholder="Your email"
  //             value={email}
  //             onChange={(e) => setEmail(e.target.value)}
  //           />
  //         </div>
  //         <div>
  //           <button
  //             onClick={(e) => {
  //               e.preventDefault();
  //               handleLogin(email);
  //             }}
  //             className="button block"
  //             disabled={loading}
  //           >
  //             <span>{loading ? "Loading" : "Send magic link"}</span>
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   );

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>

      <Text color="dimmed" size="sm" align="center" mt={12}>
        Sing in via magic link with your email below
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Email"
          placeholder="you@mantine.dev"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button
          fullWidth
          mt="xl"
          mb="lg"
          color="cyan"
          disabled={loading}
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            e.preventDefault();
            handleLogin(email);
          }}
        >
          {loading ? "Loading" : "Send magic link"}
        </Button>

        {loaded && (
          <Alert title="Check your email!" color="cyan" pt="lg">
            {" "}
          </Alert>
        )}
      </Paper>
    </Container>
  );
}
