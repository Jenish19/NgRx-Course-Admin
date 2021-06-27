import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Store } from "@ngrx/store";

import { AuthService } from "../auth.service";
import { tap } from "rxjs/operators";
import { noop } from "rxjs";
import { Router } from "@angular/router";
import { AppState } from '../../reducers';
import { login } from '../auth.actions';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: Store<AppState>) {

    this.form = fb.group({
      email: ['test@angular-university.io', [Validators.required]],
      password: ['test', [Validators.required]]
    });

  }

  ngOnInit() {

  }

  login() {

    const val = this.form.value; //email & password

    this.auth.login(val.email, val.password)
      .pipe(
        tap(user => { //tap produces side effects in RxJs Stream
          console.log(user);
          const newLoginAction = login({ user });

          // console.log("New login action: ", newLoginAction);

          this.store.dispatch(newLoginAction);

          this.router.navigateByUrl('/courses');
        })
      )
      .subscribe(
        noop, //no-operation on success
        () => alert('Login Failed') //alert on error
      );
  }

}

