import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from "./auth/auth.service";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  //learning viewchild
  @ViewChild('highlight') marker: ElementRef;
  constructor(private authService: AuthService) {
  }
  ngOnInit(): void {
    this.authService.autoLogin()
  }
  ngAfterViewInit() {
    console.log(this.marker)
  }
}





//creating promise 
// function checkEvenNumber(input: number): Promise<string> {
//   return new Promise<string>((resolve, reject) => {
//     if (input < 0) {
//       reject("Input cannot be a negative number");
//     } else if (input % 2 === 0) {
//       resolve("The input is even");
//     } else {
//       reject("The input is not even");
//     }
//   });
// }

// const inputValue = 8; // You can change this to any number you want to check

// checkEvenNumber(inputValue)
//   .then(result => {
//     console.log(result);
//   })
//   .catch(error => {
//     console.error(error);
//   });


//obserable
function getOff(input:any) {
  return new Observable(subscriber => {
    if (input % 2 === 0) {
      subscriber.error("Number is Even");
    } else {
      subscriber.next("The number is Odd");
      subscriber.complete();
    }
  });
}
const input = 5;

getOff(input).subscribe(
  result => {
    console.log(result);
  },
  error => {
    console.error(error);
  }
);




