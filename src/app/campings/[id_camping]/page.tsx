import Link from "next/link";

interface CampingPageProps {
  params: {
    id_camping: string;
  };
}

export default function CampingPage({ params }: CampingPageProps) {
  return (
    <>
      <h1>id_camping {params.id_camping}</h1>
      <Link href="/">Home</Link>
    </>
  );
}
