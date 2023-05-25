import Head from 'next/head';
import React from "react";
import type { AppProps } from 'next/app';
import { Provider } from "react-redux";

import { wrapper, store } from "../redux/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </React.Fragment>
  );
}

export default wrapper.withRedux(MyApp);

