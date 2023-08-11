import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ContactService } from '../../contact.service';
import {Name} from "../enum";

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {
  FormData: FormGroup;
  email: string = '';
  FNAME: string = '';
  Comment: string = '';

  ngOnInit() {

  }
  constructor(private builder: FormBuilder, private contact: ContactService) { }

  saveEmail() {
    let bodyMailChimp = {
      email_address: this.email,
      status: 'subscribed',
      merge_fields: {
        FNAME: this.FNAME,
        COMMENTS: this.Comment
      }

    }


    this.contact.addEmail(bodyMailChimp).subscribe(
      response => {
        console.log('Email sent successfully:', response);
        // Do something with the response if needed
      },
      error => {
        console.error('Error sending email:', error);
        // Handle the error here
      }
    );
  }





}
