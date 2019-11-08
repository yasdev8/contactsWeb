import { Component, OnInit } from '@angular/core';
import {Contact} from "../../model/model.contact";
import {ContactService} from "../../services/contact.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  mode:number=1;
  contact:Contact=new Contact();
  idContact:number;
  constructor(public contactService:ContactService, public activatedRoute:ActivatedRoute,
              public router:Router) {
    this.idContact=activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.contactService.getContact(this.idContact)
      .subscribe(data=>{
        this.contact=<Contact>data;
      }, err=>{
        console.log(err);
      })
  }

  updateContact(contact){
  this.contactService.updateContact(this.contact)
    .subscribe(data=>{
      console.log(data);
      alert("Mise à jour effectuée");
      this.router.navigate(['contacts']);
    }, err=>{
      console.log(err);
    })
  }
}
