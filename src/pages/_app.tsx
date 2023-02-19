import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/styles/theme";
import { Analytics } from "@vercel/analytics/react";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
        <Analytics />
      </ChakraProvider>
    </ApolloProvider>
  );
}
