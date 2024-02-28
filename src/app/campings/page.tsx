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
      <h1>lista de acampamentos</h1>
      {campings.map((camping) => (
        <>
          <Link
            className="border-bottom-animation"
            key={camping.id}
            href={`/campings/${camping.id}`}
          >
            {camping.name}
          </Link>
          <br />
        </>
      ))}
      <Link href="/">Home</Link>
    </>
  );
}
