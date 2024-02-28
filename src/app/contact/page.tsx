import Link from "next/link";

interface CityProps {
  params: {};
}

export default function City({ params }: CityProps) {
  return (
    <>
      <h1>contatos</h1>
      <Link href="/">Home</Link>
    </>
  );
}
