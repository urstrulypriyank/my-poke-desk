import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { client } from "@/components/appoloClinet";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Layout from "@/components/Layout";
let api = process.env.NEXT_PUBLIC_API;
console.log("API IS", api);

const PokemonDetail = ({ pokemon }) => {
  const router = useRouter();
  const query = router.query;
  if (query.isFallback) return <p>Loading...</p>;

  console.log(pokemon);
  return (
    <>
      <Layout title={pokemon.name}>
        {/* main container */}
        <div id="main">
          
          {/* image and detail secion */}
          <div>
            {/* image */}
            <div></div>
            {/* detail */}
            <div></div>

          </div>

        </div>
      </Layout>
    </>
  );
};

export async function getStaticPaths() {
  // // Fetch all Pokemon id from GraphQL API for first 60 3 pages cache
  const response = await client.query({
    query: gql`
      query GetPokemons {
        pokemons(first: 60) {
          id
        }
      }
    `,
    variables: {
      endpoint: api,
    },
  });
  const { data } = response ?? {};
  // console.log("Findig id", data.pokemons);

  const paths = data.pokemons.map((pokemon) => ({
    params: { id: String(pokemon.id) },
  }));

  return {
    paths,
    fallback: true, // Enable fallback for not statically rendered pages
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  console.log(params.id);
  // Fetch Pokemon details from GraphQL API based on id
  const response = await client.query({
    query: gql`
      query GetPokemonById($id: String) {
        pokemon(id: $id) {
          id
          name
          image
          height {
            minimum
            maximum
          }
          weight {
            minimum
            maximum
          }
          classification
          types
          weaknesses
          evolutions {
            id
            name
            image
          }
        }
      }
    `,
    variables: {
      id: String(params.id),
    },
  });
  const { data } = response;
  console.log(data.pokemon);

  return {
    props: {
      pokemon: data.pokemon,
    },
  };
}

export default PokemonDetail;
