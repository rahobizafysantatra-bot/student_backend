export type Group = 'N1' | 'N2' | 'N3';

export interface Student {
  id?: number;
  name: string;
  email: string;
  group: Group;
}

export interface Statistics {
  total: number;
  byGroup: { group: string; total: number }[];
}

export interface AuthResponse {
  token: string;
}