import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onRegister(): void {
    const user = new User(this.username, this.password, this.email, this.firstName, this.lastName);
    this.userService.createUser(user)
      .subscribe(
        data => {
          console.log(data);
        },
        err => console.log(err)
        
      );
  }

  gotoHome(): void {
    this.router.navigate(['/']);
  }

}
