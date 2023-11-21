import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule],
  selector: 'events-application-root',
  template: `<events-application-nx-welcome></events-application-nx-welcome> <router-outlet></router-outlet>`,
  styles: ``,
})
export class AppComponent {
  title = 'club-frontend';
}
