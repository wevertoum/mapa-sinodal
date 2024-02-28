import Link from "next/link";

interface CityProps {
  params: {};
}

export default function City({ params }: CityProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-10 mt-28">
      <div className="flex flex-col items-center space-y-6">
        <h1 className="max-w-3xl text-center font-bold text-gray-900 dark:text-white text-5xl leading-tight">
          CONTACTS PAGE
        </h1>
        <p className="text-lg font-medium  text-gray-900 dark:text-white">
          AQUI É A HOME PAGE
        </p>
      </div>
    </div>
  );
}
