import Head from 'next/head';
import React from "react";
import type { AppProps } from 'next/app';
import { Provider } from "react-redux";

import { wrapper, store } from "../redux/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.scss";
import Layout from '../layout/layout';
import APP_STRING from '../utils/constants';
import '@module-federation/nextjs-mf/src/include-defaults';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{APP_STRING.ONLINE_LEARNING_APP}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </Layout>
  );
}

export default wrapper.withRedux(MyApp);

