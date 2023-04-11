import Head from "next/head";
import React from "react";
// import CardComponent from "../Components/CardComponent";
import CardComponent from "@/components/CardComponent";
import { useRouter } from "next/router";
// import { client } from "@/Components/appoloClient";
import { client } from "@/components/appoloClinet";
import { gql } from "@apollo/client";
import Navbar from "@/components/Navbar";
import Layout from "@/components/Layout";

const Home = ({ pokemons }) => {
  const router = useRouter();
  let routeToPokemonPage = (id) => {
    router.push("/pokemon/" + id);
  };
  return (
    <>
      <Head>
        <title>Pokedex</title>
      </Head>

      <div className="flex w-screen  border border-yellow-600 flex-col">
        <Navbar />
        <div id="heading " className="flex w-screen items-center flex-col">
          <h1 className="text-center w-screen mt-5 text-2xl">
            Welcome to the Pokedesk
          </h1>
          <h2 className="italic">Scan Any Pokemon</h2>
        </div>

        {/* pokemon list render */}

        <div className="flex w-screen border border-red-600 flex-wrap">
          <h2>I am H2</h2>
          {pokemons.map((pokemon) => (
            <div
              onClick={() => routeToPokemonPage(pokemon.id)}
              key={pokemon.id}
              className="cursor-pointer"
            >
              <CardComponent pokemon={pokemon} key={pokemon.id} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  // Fetch data from GraphQL API
  const response = await client.query({
    query: gql`
      query GetPokemons {
        pokemons(first: 20) {
          id
          number
          name
          image
          types
        }
      }
    `,
  });

  const { data } = response ?? {};
  // console.log(data.pokemons);

  return {
    props: {
      pokemons: data.pokemons,
    },
  };
}
