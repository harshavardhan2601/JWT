import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../auth/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  details: User

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.profile().subscribe(
      user => {
        this.details = user
        console.log(this.details)
      },
      err => {
        console.error(err)
      }
    )
  }

}
