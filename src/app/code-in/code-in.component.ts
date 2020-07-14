import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IaccessData } from '../class/AccessData';

@Component({
  selector: 'app-code-in',
  templateUrl: './code-in.component.html',
  styleUrls: ['./code-in.component.scss']
})

export class CodeInComponent implements OnInit {

  private _showConfirmModal : boolean = false;
  private ETAT_ENTREE = "entree";
  private ETAT_SORTIE = "sortie";
  private DEFAULT_ETAT = this.ETAT_SORTIE;
  private DEFAULT_MESSAGE = "Bon matin!"
  public message : string = this.DEFAULT_MESSAGE;
  private code: string ;
  private arrivees: IaccessData[] = [] ;
  private data : IaccessData ;

  constructor () { }

  ngOnInit() {
    localStorage.removeItem("arrivees");
    this.arrivees = localStorage.getItem("arrivees") !== null
    ? JSON.parse(localStorage.getItem("arrivees")) : [] ;
    // console.log("les arrivées => ")
    console.log(this.arrivees);
    // this.message = "Bon matin";
  }

  codePartictipantForm = new FormGroup({
    code : new FormControl(''),
  });

  onSubmit(){
    var form = this.codePartictipantForm.value ;
    this.code = form.code;
    let etat = this.lireEtatUtilisateur();
    // if( etat === "sortie" ){
    //    this.message = "confirmer sortie";
    // }
    // if(this.isAlreadyArrived()){
    //   this.message = "Votre entrée a déja été enregistrée.";
    //} else {
    console.log("etat av => " + etat);
    etat = this.changerEtat(etat);
    var date = new Date().toLocaleDateString();
    var heure = new Date().toLocaleTimeString();
    console.log("etat ap => " + etat);
    // this.data = {
    //   "code":this.code,
    //   "date":this.dateISO(date),
    //   "heure": heure,
    //   "sense": this.sense
    // };
    this.data = {
      "code":this.code,
      "etat":etat,
      "mouvements":[
        {
          "date":this.dateISO(date),
          "heure":heure,
          "sense":etat,
        }
      ]
    }

    //console.log(JSON.stringify(this.data));
    this.storeData(this.data);
    this.message = "Votre entrée a été enregistrée avec succès. Merci.";
    // }
    this._showConfirmModal=false;
    setTimeout( () => { this.resetForm(); }, 5000 );
  }

  onSubmit1(){
    var form = this.codePartictipantForm.value ;
    this.code = form.code;
    // console.log(this.isAlreadyArrived());
    this._showConfirmModal = false ;
    this.message = "Votre entrée a été enregistrée avec succès. Merci.";
    setTimeout( () => { this.resetForm(); }, 5000 );

  }

  storeData(data){
    // this.arrivees.push(data);
    let code = this.code.toString();
    let trouve = false;

    let index = this.arrivees.findIndex( (user) => {
      return user.code === this.code;
    });

    if(index == -1 ){
      this.arrivees.push(data);
    } else {
      this.arrivees[index].etat = data.etat;
      this.arrivees[index].mouvements.push(data.mouvements[0]);
    }
    // if(this.arrivees.code)
    // this.arrivees = data;
    localStorage.setItem("arrivees", JSON.stringify(this.arrivees));
    console.log(this.arrivees);
  }

  public showConfirmModal(){
    return this._showConfirmModal = !this._showConfirmModal;
  }

  public enregistrer(){
    this.code = this.codePartictipantForm.value.code ;
    //console.log(this.code);
    if( this.isEmpty(this.code))
    this.message = "Attention, aucun code saisi.";
    else this.showConfirmModal();
  }

  dateISO(date: string){
    let d = date.split("/");
    return d[2] + "-" + d[1] + "-" + d[0] ;
  }

  isAlreadyArrived(){
    let found = this.arrivees.find(
      (user) => {
        return user.code === this.code &&
        user.mouvements[user.mouvements.length -1].sense === this.ETAT_ENTREE;
      });
      if( found !== undefined ) {

        return true ;
      }
      return false ;
    }

    lireEtatUtilisateur(){
      let user = this.arrivees.find(
        (u) => {
          return u.code === this.code;
        }
      );
      // console.log("user => " + JSON.stringify(user));
      if( user !== undefined ) return user.etat;
      return this.DEFAULT_ETAT;
    }

    changerEtat(etat : string){
       if(etat === this.ETAT_ENTREE) return this.ETAT_SORTIE;
       return this.ETAT_ENTREE;
    }

    resetForm(){
      this.codePartictipantForm.reset();
      this.message = "";
    }

    private isEmpty(val){
      if( val === "" || val === null || val == 'undefined')
      return true;
      return false;
    }

  }
