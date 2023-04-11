import Image from "next/image";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div className="flex w-screen h-screen border border-yellow-600">
        <div id="heading " className="flex w-screen items-center flex-col">
          <h1 className="text-center w-screen mt-5 text-2xl">
            Welcome to the Pokedesk
          </h1>
          <h2 className="italic">Scan Any Pokemon</h2>
        </div>
      </div>
    </>
  );
}
