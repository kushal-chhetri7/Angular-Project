import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "./auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  //learning viewchild
  @ViewChild('highlight')marker:ElementRef;
  constructor(private authService:AuthService) {
  }
  ngOnInit(): void {
    this.authService.autoLogin()
  }
  ngAfterViewInit(){
    console.log(this.marker)
  }


}
