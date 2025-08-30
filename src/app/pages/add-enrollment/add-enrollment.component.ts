import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgZorroCustomModule } from '../../ng-zorro-custom.module';

@Component({
  selector: 'app-add-enrollment',
  standalone: true,
  imports: [CommonModule, NgZorroCustomModule, RouterModule, FormsModule],
  templateUrl: './add-enrollment.component.html',
  styleUrl: './add-enrollment.component.css',
})
export class AddEnrollmentComponent implements OnInit {
  students: any[] = [];
  courses: any[] = [];
  batches: any[] = [];
  newEnrollment = {
    student_id: null,
    course_id: null,
    batch_id: null,
    status: 'Enrolled',
  };
  loading = false;
  error = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.http
      .get('http://localhost:5000/api/students')
      .subscribe((data: any) => (this.students = data));
    this.http
      .get('http://localhost:5000/api/courses')
      .subscribe((data: any) => (this.courses = data));
    this.http
      .get('http://localhost:5000/api/batches')
      .subscribe((data: any) => (this.batches = data));
  }

  addEnrollment() {
    this.loading = true;
    this.error = '';
    this.http
      .post('http://localhost:5000/api/enrollments', this.newEnrollment)
      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/enrollments']);
        },
        error: (err) => {
          this.loading = false;
          this.error = 'Failed to add enrollment';
          console.error(err);
        },
      });
  }
}
