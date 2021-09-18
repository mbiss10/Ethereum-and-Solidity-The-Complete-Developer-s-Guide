import React from "react";
import { Container } from "semantic-ui-react";
import Head from "next/head";
import Header from "./Header";

const Layout = (props) => {
  var footerDivStyle = { margin: "auto", width: "25%", borderStyle: "double" };
  var footerPStyle = { textAlign: "center" };
  return (
    <Container>
      <Head>
        <title>Eth Dev</title>
        <link
          async
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.0.0/dist/semantic.min.css"
        />
      </Head>
      <Header />
      {props.children}
    </Container>
  );
};

export default Layout;
