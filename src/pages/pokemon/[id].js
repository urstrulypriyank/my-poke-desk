import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { client } from "@/components/appoloClinet";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Layout from "@/components/Layout";
import { color } from "@/components/badgeColors";
import BadgeCardComponents from "@/components/BadgeCardComponents";
import EvolutionaryData from "@/components/EvolutionaryData";
import { useState } from "react";
let api = process.env.NEXT_PUBLIC_API;

// console.log("API IS", api);

const PokemonDetail = ({ pokemon }) => {
  const [showPopup, setShowPopup] = useState(false);

  const router = useRouter();
  const query = router.query;
  if (query.isFallback) return <p>Loading...</p>;

  // console.log(pokemon);
  return (
    <>
      <Layout title={pokemon.name}>
        {/* main container */}
        <div id="main bg-[#f2f2f2]">
          {/* headder */}
          <div className="mt-8">
            <p className="flex md:w-[50vw] w-[90vw] mx-auto rounded-xl h-20 shadow-lg  text-center justify-center items-center">
              <span className="font-sans font-medium tracking-wide text-3xl ">
                {pokemon.name}
              </span>
              <span className=" text-2xl px-5 text-gray-700 opacity-80">
                #{pokemon.number}
              </span>
            </p>
          </div>
          {/* image and detail secion */}
          <div className="min-h-screen mt-2 w-[90vw] flex pt-5 mx-auto flex-wrap sm:flex-nowrap ">
            {/* image */}
            <div className="border mx-5 w-full flex justify-center ">
              <img
                src={pokemon.image}
                className="m-10  shadow-white shadow-lg"
              />
            </div>
            {/* detail */}
            <div className=" border flex w-full p-5 flex-col ">
              <div className="flex justify-center">
                <h3 className="flex text-2xl  underline  font-semibold tracking-wider m-5">
                  {parseInt(pokemon.number)}.{pokemon.name}
                </h3>
              </div>

              {/* detail- card */}

              <div className="bg-blue-500 flex rounded-lg px-10 max-sm:px-2">
                <div className="container grid grid-cols-2 gap-2 space-y-2 my-3 justify-center items-center mx-auto">
                  {/* --------first row ------ */}
                  <div className="flex flex-col space-y-1">
                    <div className="tracking-wider font-extrabold text-white text-xl max-sm:text-sm">
                      MaxHeight{" "}
                    </div>
                    <div className="font-smeibold text-xl max-sm:text-xl">
                      {pokemon.height.maximum}
                    </div>
                  </div>

                  {/* --------first row ------ */}
                  <div className="flex flex-col space-y-1">
                    <div className="tracking-wider font-extrabold text-white text-xl max-sm:text-xl">
                      MinHeight{" "}
                    </div>
                    <div className="font-smeibold text-xl max-sm:text-xl">
                      {pokemon.height.minimum}
                    </div>
                  </div>

                  {/* --------first row ------ */}
                  <div className="flex flex-col space-y-1">
                    <div className="tracking-wider font-extrabold text-white text-xl max-sm:text-xl">
                      MaxWeight{" "}
                    </div>
                    <div className="font-smeibold text-xl max-sm:text-xl">
                      {pokemon.weight.maximum}
                    </div>
                  </div>

                  {/* --------first row ------ */}
                  <div className="flex flex-col space-y-1">
                    <div className="tracking-wider font-extrabold text-white text-xl max-sm:text-xl">
                      MinWeight{" "}
                    </div>
                    <div className="font-smeibold text-xl max-sm:text-xl">
                      {pokemon.weight.minimum}
                    </div>
                  </div>

                  {/* --------category row ------ */}
                  <div className="flex flex-col space-y-1">
                    <div className="tracking-wider font-extrabold text-white text-xl max-sm:text-xl">
                      Category{" "}
                    </div>
                    <div className="font-smeibold text-xl max-sm:text-xl">
                      {pokemon.classification}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pokemon Badges for own types */}
              <div className="p-5">
                <h4 className="text-xl font-semibold tracking-wider">Types</h4>

                <BadgeCardComponents types={pokemon.types} />
              </div>

              {/* Pokemon Badges for weakness types */}
              <div className="p-5">
                <h4 className="text-xl font-semibold tracking-wider">
                  Weaknesses
                </h4>

                <BadgeCardComponents types={pokemon.weaknesses} />
              </div>

              {/* Pokemon Badges for resistant types */}
              <div className="p-5">
                <h4 className="text-xl font-semibold tracking-wider">
                  Resistant
                </h4>

                <BadgeCardComponents types={pokemon.resistant} />
              </div>

              {/* button for evolutionary data */}
              <div className="flex w-full">
                <button
                  className="px-3 py-1 bg-blue-500 rounded-md w-full border-black mx-5 hover:text-gray-800"
                  onClick={() => {
                    setShowPopup(!showPopup);
                  }}
                >
                  Check Evolutionary Data
                </button>
              </div>
            </div>
          </div>
          <EvolutionaryData
            name={pokemon.name}
            setShowPopup={setShowPopup}
            showPopup={showPopup}
          />
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
  // console.log(params.id);
  // Fetch Pokemon details from GraphQL API based on id
  const response = await client.query({
    query: gql`
      query GetPokemonById($id: String) {
        pokemon(id: $id) {
          id
          number
          name
          weight {
            minimum
            maximum
          }
          height {
            minimum
            maximum
          }
          classification
          types
          resistant
          weaknesses
          image
        }
      }
    `,
    variables: {
      id: String(params.id),
    },
  });
  const { data } = response;
  // console.log(data.pokemon);

  return {
    props: {
      pokemon: data.pokemon,
    },
  };
}

export default PokemonDetail;
