export type PokeType = {
  id: string;
  image: string;
  name: string;
  nameKor: string;
  url: string;
};

export type PokeInfoType = {
  id: string;
  name: string;
  description: string;
  image: {
    front_default: string;
    front_shiny: string;
  };
  types: {
    name: string;
    nameKor: string;
  }[];
};
