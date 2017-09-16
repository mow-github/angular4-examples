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
  isEdit: boolean = false;
  hobbies: string[]; // any[] number[]


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

    this.hobbies = ['write code', 'watch movies', 'listen to music'];


  }


  onClick() {
    console.log('you clicked on a button');
    this.name = 'Alfred';
    //this.hobbies.push('you added me dyn');
  }

  toggleEdit() {
    this.isEdit = !this.isEdit; // toggle true/false.. used around form-tag
  }

  addHobby(hobby) {
    console.log(hobby);
    this.hobbies.unshift(hobby);
    return false;
  }

  deleteHobby(hobby) {
    this.hobbies = this.hobbies.filter((item) => { return item !== hobby; });
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


