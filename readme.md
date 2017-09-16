# Angular 4 examples

![alt text](img/angular4-logo-150x150.png)


#### What: Some Angular4 examples
#### Why: Boilerplate
#### How: read ```readme.md/instructions```
#### Technologies:
* `Angular 4`


#### Instructions:
* [angular - quickstart guide](https://angular.io/guide/quickstart)
* [angular-cli](https://github.com/angular/angular-cli)
* [angular-basic-vid](https://www.youtube.com/watch?v=htPYk6QxacQ)
* `npm install -g @angular/cli` - install the angular CLI ( command line interface )
* `ng new <appName>`            - install the angular 4 boilerplate
* `cd <appName>`                - go to the folder <appName>
* `ng serve --open`             - open the browser and display the app ( localhost:4200 by default )


#### Instructions part 2
```
/*
    What:

    1. add 2x child-components and try to add them to the parent component (app)

    Note: add etc. bootstrap 4 cdn links to the root: index.html ( so we can style and use some classes ) !!
*/

ng g component components/about        - create a about component + fix all imports etc
ng g component components/user         - create a user component + fix all imports etc

// app.module.ts
1. adds all the imports

//user.components.ts
1. the decorator @Component{...} has etc:   selector: 'app-user'
2. add <app-user></app-user> to the: root component html --> app.component.html ( it works )
```

#### Instructions part 3
```
/*
    What:

    1. We want to fetch some user dummy data ASYNC + display it for the user.
        a. Define the async method in the service file.
        b. Activate the call and store the user data in the: user.component.ts file.
        c. Iterate the data from the user variable in the user.component.html file.
            1. use a directive: *ngFor="let user of users; let i = index"
*/


ng g service services/data        - create a services folder + data files used for async requests
// fix import connections manually

// app.module.ts
import { HttpModule } from '@angular/http';
import { DataService } from './services/data.service';

  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [DataService],

// services/data.service.ts

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(public http: Http) {
    console.log('Data service connected...');
  }

  getUsers() {
    // returns a Observables ( use .map )
    return this.http.get('https://jsonplaceholder.typicode.com/users')
      .map(res => res.json());
  }

}

// user.components.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  users: User[];


  constructor(private DataService: DataService) {
    console.log('user - constr init');
  }

  ngOnInit() {

    this.DataService.getUsers().subscribe((users) => {
      console.log(users);
      this.users = users;
    });

  }

}

interface User {
  id: number;
  email: string;
  name: string;
  phone: string;
  website: string;
}

// user.components.html

<div class="row">
  <!-- user async req -->

  <h2>User component: fetch async user data</h2>
  <div class="card col-6" *ngFor="let user of users; let i = index">
    <img class="card-img-top" src="http://placehold.it/150/92c952" alt="img">
    <div class="card-block">
      <h4 class="card-title">{{ user.name }}</h4>
      <p class="card-text">{{ user.email }}</p>
      <a href="{{ user.website }}" class="btn btn-primary">Go to user website</a>
    </div>
  </div>
</div>

```


#### Instructions part 4
```
/*
    What:

    1. test string interpolation - 1-way-bind-data
        a. add some fixed data to the: user.component.ts file
            1. set name, age, email, address etc
            2. use a interface on the address object ( define alloweed subkeys and datatypes )
        b. use the string interpolation {{ keyword }} in the user...html file ( display value )

*/


//user.components.ts

export class UserComponent implements OnInit {

  name: string;
  // name = 'John doe';
  age: number;
  email: string;      // any
  address: Address;

    ngOnInit() {

      this.name = 'TOM';
      this.age = 32;
      this.email = 'doe@test.com';
      this.address = {
        street: '50 Main st',
        city: 'Boston',
        state: 'MA'
      };
    }
}

interface Address {
  street: string;
  city: string;
  state: string;
}

// user.component.html
  <div class="row">
    <h2>User component: Test string interpolation {{ keyword }}</h2>
    <div class="card col-12">
      <div class="card-block">
        <h4 class="card-title">My name is: {{name}}. I'm {{age}} years old.</h4>
        <p class="card-text">You can reach at: {{email}}</p>
        <p class="card-text">Address: {{address.street}} {{address.city}}, {{address.state}}</p>
      </div>
    </div>
  </div>
```



#### Instructions part 5
```
/*
    What:

    1. Bind a click event in the .html so it runs the onClick method and updates the name property in the .ts
*/

//user.components.ts

  onClick() {
    console.log('you clicked on a button');
    this.name = 'Alfred';
  }

//user.component.html

  <div>
    <h4>Test bind click event and update the name field</h4>
    <button class="btn btn-primary" (click)="onClick()">Click me: change the name Tom to Alfred</button>
  </div>
```

#### Instructions part 6
```
/*
    Why: 2-way-binding ( update data in both directions ) using the ngModel syntax

    What:
    1. Bind a click event in the .html so it runs the toggleEdit method n the .ts.
        a. set a: isEdit boolan variable and toggle the value when one calls the method.
        b. bind it to a if-directive in the .html ( show/hide the user-form )

    2. add the: [(ngModel)]="keyword" syntax to every inputfield ( 2-way-bind the data )

    3. import and activate the FormsModule pkg

//user.component.html

  <div>

    <button class="btn btn-success" (click)="toggleEdit()">Click me to Toggle edit user form</button>
    <div *ngIf=isEdit>
      <form>
        <div>
          <label for="name">Name: </label><br>
          <input id="name" class="form-control" type="text" [(ngModel)]="name" name="name">
        </div>
        <div>
          <label for="age">Age: </label><br>
          <input id="age" class="form-control" type="number" [(ngModel)]="age" name="age">
        </div>
        <div>
          <label for="email">Email: </label><br>
          <input id="email" class="form-control" type="text" [(ngModel)]="email" name="email">
        </div>
        <div>
          <label for="street">Street: </label><br>
          <input id="street" class="form-control" type="text" [(ngModel)]="address.street" name="address.street">
        </div>
        <div>
          <label for="city">City: </label><br>
          <input id="city" class="form-control" type="text" [(ngModel)]="address.city" name="address.city">
        </div>
        <div>
          <label for="state">State: </label><br>
          <input id="state" class="form-control" type="text" [(ngModel)]="address.state" name="address.state">
        </div>
      </form>
    </div>

  </div>

// user.component.ts

  isEdit: boolean = false;

  toggleEdit() {
    this.isEdit = !this.isEdit; // toggle true/false.. used around form-tag
  }

// app.module.ts

import { FormsModule } from '@angular/forms';
  ...
  imports: [
    FormsModule,
    ...
  ],
  ...


*/

```


#### Instructions part 7
```
/*
    What:

    1. Bind a click for add- delete- a hobby in the .html.
     a. 2x methods in the .ts that adds a hobby to the hobbies array AND one that deletes a hobby item from the array
*/

// user.component.html

  <div>
    <form (submit)="addHobby(hobby.value)">
      <div>
        <label for="hobby">Hobby:</label>
        <input id="hobby" class="form-control" type="text" #hobby>
      </div>
    </form>

    <ul class="list-group">
      <li class="list-group-item justify-content-between" *ngFor="let hobby of hobbies; let i = index">
        {{i+1}} {{hobby}} <button class="btn btn-danger" (click)="deleteHobby(hobby)">X</button>
      </li>
    </ul>

  </div>

// user.component.ts

  hobbies: string[]; // any[] number[]

  ngOnInit() {
    this.hobbies = ['todo1','todo2','todo3'];
  }

  addHobby(hobby) {
    console.log(hobby);
    this.hobbies.unshift(hobby);
    return false;
  }

  deleteHobby(hobby) {
    this.hobbies = this.hobbies.filter((item) => { return item !== hobby; });
  }
```


#### Notes:
* `example1 - example with some angular keywords and components, async req`


Keywords                   | Syntax                                             | Explanation                                                  |
-------------------------- | ---------------------------------------------------| ------------------------------------------------------------ |
*string interpolation*     | `{{keyword}}`                                      | updates the data in 1-way                                    |
*2-way-binding*            | `[(ngModel)]="keyword"`                            | updates the data in both directions                          |
*property binding*         | `[(ngModel)]="keyword"`                            | uses the []=<whatIamDependingOnToWork>                       |
*directives*               | `*ngFor="let hobby of hobbies; let i = index"`     | cond. statments                                              |
*decorator*                | `@<keyword>`                                       | meta data about code element                                 |
*Services*                 | `...`                                              | Async management, uses injectable pkg, and observable        |


`          | Links                                              |
---------- | -------------------------------------------------- |
*Author(s)*| `Mats Wikmar`                                      |