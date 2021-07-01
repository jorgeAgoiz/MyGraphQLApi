export interface Team {
  id: number;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  name: string;
}

export interface Player {
  id: number;
  first_name: string;
  height_feet: string | null;
  height_inches: string | null;
  last_name: string;
  position: string | null;
  team: Team | null;
  weight_pounds: string | null;
}
