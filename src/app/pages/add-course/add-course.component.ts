import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [FormsModule, NzInputModule, NzButtonModule, NgIf],
  templateUrl: './add-course.component.html',
})
export class AddCourseComponent {
  course = { name: '', code: '' };
  loading = false;
  error = '';

  constructor(private http: HttpClient, private router: Router) {}

  addCourse() {
    this.loading = true;
    this.http.post('http://localhost:5000/api/courses', this.course).subscribe({
      next: (res: any) => {
        if (res) this.router.navigate(['/courses']);
        else this.error = 'Failed to add course';
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to add course';
        this.loading = false;
      },
    });
  }
}
