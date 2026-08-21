export type Group = 'N1' | 'N2' | 'N3';

export interface Student {
  id?: number;
  name: string;
  email: string;
  group: Group;
}