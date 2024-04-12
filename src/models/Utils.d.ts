namespace Models {
  interface MenuItens {
    label: string;
    icon: any;
    url: string;
  }

  type Coords = { x: number; y: number };

  type DrawedLine = {
    start: Models.Coords;
    end: Models.Coords;
    color: string;
    width: number;
  };
}
