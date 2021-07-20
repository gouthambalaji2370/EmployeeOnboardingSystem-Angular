import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EmployeeOnboardingSystem';
  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    confirm("Changes you made may not be saved.");
    event.returnValue = false;
  }
}
