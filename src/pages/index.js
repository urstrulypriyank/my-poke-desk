import Head from "next/head";
import React, { useEffect, useState } from "react";
// import CardComponent from "../Components/CardComponent";
import CardComponent from "@/components/CardComponent";
import { useRouter } from "next/router";
// import { client } from "@/Components/appoloClient";
import { client } from "@/components/appoloClinet";
import { useLazyQuery, gql } from "@apollo/client";
import Navbar from "@/components/Navbar";
import LoadComponent from "@/components/Loading";
const GET_POKEMON = gql`
  query GetPokemons($first: Int!) {
    pokemons(first: $first) {
      id
      number
      name
      image
      types
    }
  }
`;
const Home = ({ pokemons }) => {
  const [pokemonArrary, setPokemonArray] = useState(pokemons);
  const [currentpokemonArrary, setcurrentPokemonArray] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [getPokemon, { loading, error, data }] = useLazyQuery(GET_POKEMON);

  useEffect(() => {
    if (pageNumber * 20 > 60) {
      console.log("Inside If");
      console.log(pageNumber);
      getPokemon({ variables: { first: pageNumber * 20 } });

      // const fetchData = async () => {
      //   try {
      //     const response = await client.query({
      //       query: gql`
      //         query GetPokemons($first: Int!) {
      //           pokemons(first: $first) {
      //             id
      //             number
      //             name
      //             image
      //             types
      //           }
      //         }
      //       `,
      //       variables: {
      //         first: pageNumber * 20,
      //       },
      //     });
      //     const { data } = response ?? {};
      //     const new_data = data.pokemons.slice(
      //       pageNumber * 20 - 20,
      //       pageNumber * 20
      //     );
      //     setcurrentPokemonArray(new_data);
      //   } catch (error) {
      //     console.error("Error fetching data:", error);
      //   }
      // };
      // fetchData();
    } else {
      console.log("Inside Else", pageNumber);

      setcurrentPokemonArray(
        pokemonArrary?.slice(pageNumber * 20 - 20, pageNumber * 20)
      );
    }
  }, [pageNumber]);

  useEffect(() => {
    if (!loading && !error && data) {
      console.log(data);
      // const { data2 } = data ?? {};
      const new_data = data?.pokemons.slice(
        pageNumber * 20 - 20,
        pageNumber * 20
      );
      setcurrentPokemonArray(new_data);
    }
  }, [data]);

  const router = useRouter();
  let routeToPokemonPage = (id) => {
    router.push("/pokemon/" + id);
  };

  // Pagination Funcs
  function handlePrevious() {
    setPageNumber(pageNumber - 1);
  }
  function handleNext() {
    setPageNumber(pageNumber + 1);
  }

  if (loading) {
    return <LoadComponent />;
  }

  return (
    <>
      <Head>
        <title>Pokedex</title>
      </Head>

      <div className="bg-[#f2f2f2]">
        <Navbar />
        <div id="heading " className="flex w-screen items-center flex-col">
          <h1 className="text-center w-screen mt-5 text-2xl">
            Welcome to the Pokedesk
          </h1>
          <h2 className="italic">Clik Any Pokemon to Know More</h2>
        </div>

        {/* pokemon list render */}

        <div className="flex flex-wrap justify-between  mx-auto items-center w-[90vw] ">
          {currentpokemonArrary.map((pokemon) => (
            <div
              onClick={() => routeToPokemonPage(pokemon.id)}
              key={pokemon.id}
              className="cursor-pointer"
            >
              <CardComponent pokemon={pokemon} key={pokemon.id} />
            </div>
          ))}
        </div>

        {/* Button Container */}
        <div className="flex flex-row  w-[80vw]  justify-between mx-auto m-5 p-5  ">
          <button
            className="bg-[#f57522] px-5 py-2 rounded-md font-semibold tracking-wide disabled:bg-gray-500 "
            onClick={handlePrevious}
            disabled={pageNumber === 1}
          >
            Back
          </button>
          <button
            className="bg-[#f57522] px-5 py-2 rounded-md font-semibold tracking-wide  disabled:bg-gray-500"
            onClick={handleNext}
            disabled={pageNumber * 20 >= 151}
          >
            Next
          </button>
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
        pokemons(first: 60) {
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
