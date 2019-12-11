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
  private sense : string = "Arrivée" ;
  public message : string ;
  private code: string ;
  private arrivees: IaccessData[] = [] ;
  private data : IaccessData ;

  constructor () { }

  ngOnInit() {
    // localStorage.removeItem("arrivees");
    this.arrivees = localStorage.getItem("arrivees") !== null
    ? JSON.parse(localStorage.getItem("arrivees"))
    : [] ;
    console.log(this.arrivees);
  }

  codePartictipantForm = new FormGroup({
    code : new FormControl(''),
  });

  onSubmit(){
    var form = this.codePartictipantForm.value ;
    this.code = form.code;
    if(this.isAlreadyEntered()){
      this.message = "Votre entrée a déja été enregistrée.";
    } else {
      // var date = new Date().toLocaleDateString();
      // var heure = new Date().toLocaleTimeString();
      // this.data = {
      //   "code":this.code,
      //   "date":this.dateISO(date),
      //   "heure": heure,
      //   "sense": this.sense
      // };
      // this.storeData(this.data);

      this.message = "Votre entrée a été enregistrée avec succès. Merci.";
    }
    this._showConfirmModal=false;
    this.resetForm();


    // setTimeout( () => {
    //   this.resetForm();
    //   this._showConfirmModal=false;
    // }, 5000 );
  }

onSubmit1(){
  var form = this.codePartictipantForm.value ;
  this.code = form.code;
  console.log(this.isAlreadyArrived());
  this._showConfirmModal = false ;
  this.message = "Votre entrée a été enregistrée avec succès. Merci.";
  setTimeout( () => {  this.resetForm(); }, 5000 );

}
  public showConfirmModal(){
    // this.message = "Merci de confirmer votre " + this.sense;
    return this._showConfirmModal = !this._showConfirmModal;
  }

  storeData(data){
    this.arrivees.push(data);
    localStorage.setItem("arrivees", JSON.stringify(this.arrivees));
  }

  dateISO(date: string){
    let d = date.split("/");
    return d[2] + "-" + d[1] + "-" + d[0] ;
  }

  isAlreadyArrived(){
    let found = this.arrivees.find(
      arrivee => arrivee.code === this.code && arrivee.sense === 'Arrivée'
    );
    if ( found !== undefined ) return true ;
    return false ;
  }

  resetForm(){
    this.codePartictipantForm.reset();
    this.message = "";
  }

}
