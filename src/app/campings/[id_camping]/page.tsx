import Link from "next/link";

interface CityProps {
  params: {
    id_camping: string;
  };
}

export default function City({ params }: CityProps) {
  return (
    <>
      <h1>id_camping {params.id_camping}</h1>
      <Link href="/">Home</Link>
    </>
  );
}
