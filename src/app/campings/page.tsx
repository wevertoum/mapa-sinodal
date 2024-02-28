import Link from "next/link";

interface CityProps {}

export default function City({}: CityProps) {
  const campings = [
    {
      name: "Camping 1",
      id: "1",
    },
    {
      name: "Camping 2",
      id: "2",
    },
  ];

  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-10 mt-28">
        <div className="flex flex-col items-center space-y-6">
          <h1 className="max-w-3xl text-center font-bold text-gray-900 dark:text-white text-5xl leading-tight">
            CAMPINGS PAGE
          </h1>
          <p className="text-lg font-medium  text-gray-900 dark:text-white">
            AQUI É A HOME PAGE
          </p>
        </div>
      </div>
      {campings.map((camping) => (
        <>
          <Link
            className="border-bottom-animation text-gray-900 dark:text-white"
            key={camping.id}
            href={`/campings/${camping.id}`}
          >
            {camping.name}
          </Link>
          <br />
        </>
      ))}
    </>
  );
}
