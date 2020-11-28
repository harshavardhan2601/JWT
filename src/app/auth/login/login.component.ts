import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from  '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title: string;
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private authService: AuthService,private router: Router) {
    this.createForm();
   }

   createForm() {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    })
  }

  ngOnInit(): void {
    this.title = 'Administrator Login';
  }

  onSubmit() {
    console.log(this.loginForm.value)
    var data = this.loginForm.value
    this.authService.logindata(data)
    .subscribe(res =>{
      console.log(res)
      this.gettoken(res)
      if (res) {
        
        this.router.navigateByUrl('/backend/dashboard');
      }
      else{
        alert('database not connected')
      }
    });
    // this.router.navigateByUrl('/backend/dashboard');
  }


  gettoken(data) {
    this.authService.saveToken(data)
  }

}
