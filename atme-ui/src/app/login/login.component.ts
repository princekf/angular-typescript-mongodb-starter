import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  login(event): void{

    event.preventDefault();
    const data = event.target;
    const username = data.querySelector('#username').value;
    //const password = data.querySelector('#password').value;
    console.log(username)

  }

}
