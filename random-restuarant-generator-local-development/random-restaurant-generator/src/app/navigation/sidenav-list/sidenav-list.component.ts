import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
@Output() closeSidenav = new EventEmitter<void>();

user: SocialUser;

constructor(private authService: AuthService) {  }

ngOnInit() {
  this.authService.authState.subscribe((user) => {
    this.user = user;
  });
}

signInWithGoogle(): void {
  this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
}

signOut(): void {
  this.authService.signOut();
}

  onClose(){
    this.closeSidenav.emit();
  }
}
