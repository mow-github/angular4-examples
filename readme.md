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
* `npm install -g @angular/cli` - install the angular CLI ( command line interface )
* `ng new <appName>`            - install the angular 4 boilerplate
* `cd <appName>`                - go to the folder <appName>
* `ng serve --open`             - open the browser and display the app ( localhost:4200 by default )


#### Instructions part 2
```
/*
    What:

    1. add 2x child-components and try to add them to the parent component (app)
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