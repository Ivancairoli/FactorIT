import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  value: string | undefined;
  loading: boolean = false;
  formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({
      username: new FormControl('',[]),
      password: new FormControl('', [])
    })
  }

  ngOnInit(): void {
    
  }

  load() {
      this.loading = true;

      setTimeout(() => {
          this.loading = false
      }, 2000);
  }
}
