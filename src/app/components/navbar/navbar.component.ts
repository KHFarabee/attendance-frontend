import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgZorroCustomModule } from '../../ng-zorro-custom.module';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgZorroCustomModule, CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  navList: any[] = [
    {
      name: 'Students',
      routerLink: '/students',
    },
    {
      name: 'Instructors',
      routerLink: '/instructors',
    },
    {
      name: 'Batches',
      routerLink: '/batches',
    },
    {
      name: 'Courses',
      routerLink: '/courses',
    },
    {
      name: 'Enrollments',
      routerLink: '/enrollments',
    },
    {
      name: 'Attendance',
      routerLink: '/attendance',
    },
    {
      name: 'Mark Attendance',
      routerLink: '/mark-attendance',
    },
  ];
}
