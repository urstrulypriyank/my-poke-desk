import Image from "next/image";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { client } from "@/Components/appoloClient";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

let api = process.env.NEXT_PUBLIC_API;
console.log("api value ", api);

export default function Home({ pokemons }) {
  return (
    <>
      <div className="flex w-screen  border border-yellow-600 flex-col">
        <div id="heading " className="flex w-screen items-center flex-col">
          <h1 className="text-center w-screen mt-5 text-2xl">
            Welcome to the Pokedesk
          </h1>
          <h2 className="italic">Scan Any Pokemon</h2>
        </div>
        {/* pokemon list render */}
        {pokemons.map((pokemon) => (
          <div key={pokemon.id} className="">
            <Link href={`/pokemon/${pokemon.id}`}>
              <p key={pokemon.id}>{pokemon.name} </p>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

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
