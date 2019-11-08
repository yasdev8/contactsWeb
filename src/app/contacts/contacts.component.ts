import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {parseHttpResponse} from "selenium-webdriver/http";
import {ContactService} from "../../services/contact.service";
import {Router} from "@angular/router";
import {Contact} from "../../model/model.contact";

@Component({
  selector: 'app-c',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  pageContacts:any;
  motCle:string="";
  currentPage:number=0;
  size:number=5;
  pages:Array<number>;

  constructor(public contactService:ContactService, public router:Router) { }

  ngOnInit() {

  }

  doSearch(){
    this.contactService.getContacts(this.motCle,this.currentPage,this.size)
      .subscribe((data:any)=>{
        this.pageContacts=data;
        this.pages=new Array(data.totalPages);
      }, err=>{
        console.log(err);
      })
  }

  chercher(){
    this.currentPage=0;
    this.doSearch();
  }

  gotoPage(i:number){
    this.currentPage=i;
    this.doSearch();
  }

  onEditContact(id:number){
    this.router.navigate(['editContact',id]);
  }

  onDeleteContact(contact:Contact){
    let confirm=window.confirm("Etes-vous sûr de vouloir supprimer ce contact");
    if(confirm==true) {
      this.contactService.deleteContact(contact.id)
        .subscribe(data => {
          //on essaye de retirer de la liste le contact que l'on vient de supprimer
          this.pageContacts.content.splice(this.pageContacts.content.indexOf(contact), 1);
        }, err => {
          console.log(err);
        })
    }
  }

}
