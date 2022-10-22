import Image from "@/components/Image";

export default function ArticleOverview() {
  return (
    <div className="flex flex-col border-b border-dashed border-slate-200 dark:border-slate-700 py-8">
      <Image
        src="/images/featured-image.webp"
        alt="Next.js"
        className="h-80 w-full object-cover rounded-lg"
      />
      <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-300 my-2">
        ¿Cómo crear una colección de NFTs en Solana con IPFS?
      </h1>
      <div className="flex flex-row w-full py-4">
        <Image
          src="/avatar.jpeg"
          alt="Avatar"
          className="h-10 w-10 rounded-full"
        />
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col">
            <p className="text-base font-bold text-slate-800 dark:text-slate-300 px-4">
              Alejandro Sánchez Yalí
            </p>
            <p className="text-base font-light text-slate-800 dark:text-slate-300 px-4">
              10 de Junio de 2021
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-base text-right font-bold text-slate-800 dark:text-slate-300">
              5 min de lectura
            </p>
            <p className="text-base text-right font-light text-slate-800 dark:text-slate-300">
              1.5k lecturas
            </p>
          </div>
        </div>
      </div>

      <p className="text-base font-light text-slate-800 dark:text-slate-300">
        En este tutorial aprenderás a crear una colección de NFTs en Solana con
        IPFS. Para ello, crearemos un proyecto de Next.js y utilizaremos la
        librería de React llamada react-ipfs. Esta librería nos permite subir un
        archivo a IPFS y obtener su hash. Este hash es el que utilizaremos para
        crear el NFT en Solana. Para ello, utilizaremos el SDK de Solana llamado
        solana-web3.js. Este SDK nos permite interactuar con la red de Solana.
      </p>
      <p className="text-base font-semibold text-sky-700 dark:text-sky-500 pt-2">
        Leer más ...
      </p>


    </div>
  );
}
