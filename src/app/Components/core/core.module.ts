import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {ModalsComponent} from './alerts/alerts.component'
import { FormsModule } from '@angular/forms';
import { ErrorpageComponent } from './error-page/error-page.component';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ModalsComponent,
    ErrorpageComponent,
    ScrollToTopComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [HeaderComponent, FooterComponent, ModalsComponent, ErrorpageComponent, ScrollToTopComponent,  CommonModule, FormsModule]
})
export class CoreModule { }
