export class Participant {
  code: string ;
  nom: string ;
  prenom: string ;

  constructor(code: string, nom: string, prenom: string) {
    this.setCode(code);
    this.setNom(nom);
    this.setPrenom(prenom);
  }

  getCode(){
    return this.code;
  }

  setCode(code: string){
    this.code = code ;
  }

  getNom() {
    return this.nom ;
  }

  setNom(nom:string) {
    this.nom = nom ;
  }

  getPrenom() {
    return this.prenom ;
  }

  setPrenom(prenom: string) {
    this.prenom = prenom ;
  }
}
