import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-button',
  standalone: true,
  template: `
    <a [routerLink]="href()">
      <ng-content></ng-content>
    </a>
  `,
  host: {
    class: 'block w-fit border border-red-500 rounded-md p-4 m-2',
  },
  imports: [RouterLink],
})
export class NavButtonComponent {
  href = input<string>('');
}
