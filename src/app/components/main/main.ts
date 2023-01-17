import {Component, Inject, OnInit} from '@angular/core';
import {ApiArgonauteService} from "../../services/api-argonaute.service";
import {Membre} from "../../models/membre";
import {Observable} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-main',
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})

export class Main implements OnInit {

  public membres!: Observable<Membre[]>;

  public formulaire!: FormGroup;

  constructor(@Inject(ApiArgonauteService) private apiArgonaute: ApiArgonauteService) {
  }

  ngOnInit() {
    this.formulaire = new FormGroup({
      nom: new FormControl(null, Validators.required)
    })
    this.membres = this.apiArgonaute.getEquipage()
  }


  onSubmit(): void {
    this.apiArgonaute.postEquipage({nom: this.formulaire.controls['nom'].value}).subscribe(
      () => this.membres = this.apiArgonaute.getEquipage()
    )
    this.formulaire.reset()
  }
}
