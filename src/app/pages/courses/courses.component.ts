import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgZorroCustomModule } from '../../ng-zorro-custom.module';

interface Course {
  id: number;
  name: string;
  code: string;
}

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [NgZorroCustomModule, CommonModule, RouterLink],
  templateUrl: './courses.component.html',
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  loading = false;
  error = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.loading = true;
    this.http
      .get<{ success: boolean; data: Course[] }>(
        'http://localhost:5000/api/courses'
      )
      .subscribe({
        next: (res: any) => {
          if (res) this.courses = res;
          else this.error = 'Failed to load courses';
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load courses';
          this.loading = false;
        },
      });
  }
}
