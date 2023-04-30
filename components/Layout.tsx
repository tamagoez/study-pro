import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "Stupper" }: Props) => (
  <div>
    <style jsx>{`
      header {
        width: 100vw;
        background: rgba(255, 204, 17, 0.1);
        position: fixed;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        height: 30px;
        width: 100vw;
        top: 0;
      }
      .header_title {
        text-align: center;
        font-size: 16px;
        padding-top: 2px;
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
      <p className="header_title">{title}</p>
    </header>
    <main style={{ paddingTop: "30px" }}>{children}</main>
    <footer>
      <hr />
      <span>フッター!</span>
    </footer>
  </div>
);

export default Layout;
