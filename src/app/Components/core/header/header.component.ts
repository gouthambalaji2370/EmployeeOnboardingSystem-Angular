import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(http:HttpClient,private router:Router) { }

  ngOnInit(): void {
  }
  logout():void{
    this.router.navigate(['/'])
  }
}
