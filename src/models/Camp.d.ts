namespace Models {
  interface Member {
    id: string;
    id_camp: string;
    id_accommodation: string;
    id_bedroom: string;
    name: string;
    age: number;
    cpf: string;
    gender: "M" | "F";
  }

  interface Bedroom {
    id: string;
    sequence: number;
    members: string[];
    id_camp: string;
    id_accommodation: string;
    name: string;
    capacity: number;
    gender: "M" | "F";
  }

  interface Accommodation {
    id: string;
    id_camp: string;
    name: string;
    bedrooms: string[];
  }

  interface Camp {
    id: string;
    name: string;
    date: string;
    accommodations: string[];
  }
}
