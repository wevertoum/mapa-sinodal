namespace Models {
  interface Member {
    id: string;
    id_camp: string;
    name: string;
    age: number;
    cpf: string;
    gender: "M" | "F";
  }

  interface Bedroom {
    id: string;
    id_camp: string;
    visibleNumber: number;
    capacity: number;
    members: string[];
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
