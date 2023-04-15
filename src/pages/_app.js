import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
const client = new ApolloClient({
  uri: "https://graphql-pokemon2.vercel.app/",

  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  );
}
