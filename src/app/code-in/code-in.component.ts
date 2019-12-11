import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-code-in',
  templateUrl: './code-in.component.html',
  styleUrls: ['./code-in.component.scss']
})

export class CodeInComponent implements OnInit {

  private _showConfirmModal : boolean = false;
  private sense : string = "Arrivée" ;
  public message ;
  private code: string ;
  private arrivees: any = [] ;
  private data ;

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
      var date = new Date().toLocaleDateString();
      var heure = new Date().toLocaleTimeString();
      this.data = {
        "code":this.code,
        "date":this.dateISO(date),
        "heure": heure,
        "sense": this.sense
      };
      this.storeData(this.data);
      this.message = "Votre entrée a été enregistrée avec succès. Merci.";
    }
    setTimeout( () => { this.resetForm(); }, 5000 );
  }

  public showConfirmModal(){
    this.message = "Merci de confirmer votre " + this.sense;
    return this._showConfirmModal = !this._showConfirmModal;
  }

  storeData(data){
    this.arrivees.push(data);
    localStorage.setItem("arrivees", JSON.stringify(this.arrivees));
  }

  dateISO(date: String){
    let d = date.split("/");
    return d[2] + "-" + d[1] + "-" + d[0] ;
  }

  isAlreadyEntered(){
    let isTrue: boolean = true ;
    if ( this.arrivees.find( (arrivee) => {
      (arrivee.code === this.code) && (arrivee.sense === 'Départ')
    } ) === undefined )
    isTrue = false ;
    return isTrue ;
  }

  resetForm(){
    this.codePartictipantForm.reset();
    this.message = "";
  }

}
