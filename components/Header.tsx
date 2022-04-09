import Link from "next/link";
import {
  Header as H,
  Title,
  Group,
  createStyles,
  Button,
  ButtonProps,
} from "@mantine/core";
import { VscGithubInverted } from "react-icons/vsc";
import { supabase } from "../utils/supabaseClient";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: 56,
  },
}));

async function signOut() {
  const { error } = await supabase.auth.signOut();
}

function GithubButton(props: ButtonProps<"button">) {
  return (
    <Link passHref href="https://github.com/nexxeln">
      <Button
        {...props}
        leftIcon={<VscGithubInverted />}
        sx={(theme) => ({
          backgroundColor:
            theme.colors.dark[theme.colorScheme === "dark" ? 9 : 6],
          color: "#fff",
          "&:hover": {
            backgroundColor:
              theme.colors.dark[theme.colorScheme === "dark" ? 9 : 6],
          },
        })}
      />
    </Link>
  );
}

const Header = () => {
  const { classes } = useStyles();

  return (
    <H height="">
      <Group px={12} className={classes.inner}>
        <GithubButton>GitHub</GithubButton>

        <Title>NEX TODO</Title>

        <Button color="cyan" onClick={signOut}>
          Log out
        </Button>
      </Group>
    </H>
  );
};

export default Header;
