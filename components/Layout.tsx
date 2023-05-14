import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import {
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
} from "@chakra-ui/react";
import { MdMenu } from "react-icons/md";
import { movePage } from "../scripts/action";
import { useRouter } from "next/router";

const APP_TITLE = "StudySharp";

type Props = {
  children?: ReactNode;
  titleprop?: string;
  showfooter?: boolean;
};

// タイトルはデフォルトでStupperになる
// Layout側から指定してあげると`タイトル | Stupperという形になる`
export default function Layout({
  children,
  titleprop = APP_TITLE,
  showfooter = true,
}: Props) {
  let title = titleprop;
  if (titleprop !== APP_TITLE) title = `${title} | ${APP_TITLE}`;
  const router = useRouter();
  return (
    <div>
      <style jsx>{`
        header {
          width: 100vw;
          background: rgba(211, 233, 208, 0.4);
          position: fixed;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          height: 40px;
          width: 100vw;
          top: 0;
        }
        .header_title {
          text-align: center;
          font-size: 16px;
          padding-top: 6px;
        }
        main {
          min-width: 100xw;
          min-height: 100vh;
        }
      `}</style>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <Flex>
          <MenuComponent router={router} />
          <Spacer />
          <p className="header_title">{title}</p>
          <Spacer />
        </Flex>
      </header>
      <main style={{ paddingTop: "40px" }}>{children}</main>
      {showfooter ? (
        <footer>
          <hr />
          <span>Stupper by tamagoez</span>
        </footer>
      ) : undefined}
    </div>
  );
}

const MenuComponent = ({ router }: { router: any }) => (
  <Menu>
    <MenuButton
      as={IconButton}
      aria-label="Options"
      icon={<MdMenu />}
      variant="outline"
    />
    <MenuList>
      <MenuItem command="⌘T" onClick={() => router.push("todo")}>
        タスクを管理
      </MenuItem>
    </MenuList>
  </Menu>
);
