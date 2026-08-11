export type Groupe = 'N1' | 'N2' | 'N3';

export interface Student {
  id?: number;
  nom: string;
  groupe: Groupe;
}