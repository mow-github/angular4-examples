import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  name: string;
  // name = 'John doe';
  age: number;
  email: string;      // any
  address: Address;

  users: User[];


  constructor(private DataService: DataService) {
    console.log('user - constr init');
  }

  ngOnInit() {

    this.name = 'TOM';
    this.age = 32;
    this.email = 'doe@test.com';
    this.address = {
      street: '50 Main st',
      city: 'Boston',
      state: 'MA'
    };

    this.DataService.getUsers().subscribe((users) => {
      console.log(users);
      this.users = users;
    });

  }

}

interface Address {
  street: string;
  city: string;
  state: string;
}

interface User {
  id: number;
  email: string;
  name: string;
  phone: string;
  website: string;
}


