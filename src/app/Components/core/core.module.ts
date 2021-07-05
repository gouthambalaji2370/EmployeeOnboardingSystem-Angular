import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {ModalsComponent} from './alerts/alerts.component'
import { FormsModule } from '@angular/forms';
import { ErrorpageComponent } from './errorpage/errorpage.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ModalsComponent,
    ErrorpageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [HeaderComponent, FooterComponent, ModalsComponent, CommonModule, FormsModule]
})
export class CoreModule { }
