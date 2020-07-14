export interface IaccessData {
  // code: string,
  // date: string,
  // heure: string,
  // sense: string
  code: string,
  etat: string,
  // mouvements: { date: string, heure: string, sense: string } [];
  mouvements: Imouvement[];
}

export interface Imouvement {
  date: string,
  heure: string,
  sense: string
}
