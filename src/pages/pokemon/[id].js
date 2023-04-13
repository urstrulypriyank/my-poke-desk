import { gql } from "@apollo/client";
import { client } from "@/components/appoloClinet";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import BadgeCardComponents from "@/components/BadgeCardComponents";
import EvolutionaryData from "@/components/EvolutionaryData";
import { useState } from "react";
import BadgeCardContainer from "@/components/BadgeCardContainer";
import Headder from "@/components/dashBoard/Headder";
import DetailCard from "@/components/dashBoard/DetailCard";
import Loading from "@/components/Loading";

const PokemonDetail = ({ pokemon }) => {
  const [showPopup, setShowPopup] = useState(false);

  const router = useRouter();
  const query = router.query;
  if (query.isFallback) return <Loading />;

  return (
    <Layout title={pokemon?.name}>
      {/* main container */}
      <div id="main bg-[#f2f2f2]">
        {/* headder */}
        {/* <Headder name={pokemon?.name} number={pokemon?.number} /> */}
        {/* image and detail secion */}
        <div className="min-h-screen mt-2 w-[90vw] flex pt-5 mx-auto flex-wrap sm:flex-nowrap ">
          {/* image */}
          <div className="border mx-5 w-full flex justify-center ">
            <img src={pokemon?.image} className="m-10 shadow-white shadow-lg" />
          </div>
          {/* detail */}
          <div className=" border flex w-full p-5 flex-col ">
            <div className="flex justify-center">
              <h3 className="flex text-2xl  underline  font-semibold tracking-wider m-5">
                {pokemon?.number}.{pokemon?.name}
              </h3>
            </div>

            {/* detail- card */}

            <DetailCard
              height={pokemon?.height}
              weight={pokemon?.weight}
              classification={pokemon?.classification}
            />

            {/* ----- Pokemon Badges for own types BADGES ----- */}
            <BadgeCardContainer title={"Types"} badgeType={pokemon?.types} />
            <BadgeCardContainer
              title={"Weakness"}
              badgeType={pokemon?.weaknesses}
            />
            <BadgeCardContainer
              title={"Resistant"}
              badgeType={pokemon?.resistant}
            />

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
          name={pokemon?.name}
          setShowPopup={setShowPopup}
          showPopup={showPopup}
        />
      </div>
    </Layout>
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
  });
  const { data } = response ?? {};

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
          types
          resistant
          weaknesses
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
