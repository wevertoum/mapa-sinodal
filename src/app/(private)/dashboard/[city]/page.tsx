import Link from "next/link";

interface CityProps {
  params: {
    city: string;
  };
}

export default function City({ params }: CityProps) {
  return (
    <>
      <h1>City {params.city}</h1>
      <Link href="/">Home</Link>
    </>
  );
}
