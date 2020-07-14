import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.scss']
})
export class ParticipantComponent implements OnInit {

  constructor( private fb: FormBuilder ) { }

  ngOnInit() {
  }

  participantForm = this.fb.group({
    code: [''],
    nom: [''],
    prenom: [''],
  });

  onSubmit(){
    console.warn(this.participantForm.value);
  }

}
