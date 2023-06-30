"use client";

import React, { ReactNode, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { MdMenu } from "react-icons/md";
// import { movePage } from "../scripts/action";
import { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";

// supabase
// const user = useUser();

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
          z-index: 9000;
        }
        .header_title {
          text-align: center;
          font-size: 16px;
          margin: 0;
          margin-top: 6px;
        }
        main {
           {
            /* min-width: 100vw; */
          }
          min-height: 100vh;
        }
      `}</style>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>{title}</header>
      <main style={{ paddingTop: "40px" }}>{children}</main>
      {showfooter ? (
        <footer>
          <hr />
          <span>勉強をする全ての人へ by tamagoez</span>
        </footer>
      ) : undefined}
    </div>
  );
}

const menulist = [
  { title: "タスク", url: "todo", command: "⌘T" },
  { title: "時計", url: "clock", command: "⌘C" },
];
