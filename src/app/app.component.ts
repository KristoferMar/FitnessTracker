import { Component, ViewChild, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'fitness-tracker';

  // Gives us access to a # variale in the html code.
  // @ViewChild('sidenav')

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.initAuthListener();
  }

  //Emit an event
  onToggle() {

  }
}
