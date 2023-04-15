import React from "react";
import Navbar from "./Navbar";
import Head from "next/head";

const Layout = ({ title, children }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Pokemon Pokedex app to search pokemon unofficial app"
        />
        <link rel="/favicon.ico" />
      </Head>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
