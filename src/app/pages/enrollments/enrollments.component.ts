import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgZorroCustomModule } from '../../ng-zorro-custom.module';

interface Enrollment {
  id: number;
  student_name: string;
  course_title: string;
  batch_name: string;
  status: string;
}

@Component({
  selector: 'app-enrollments',
  standalone: true,
  imports: [CommonModule, NgZorroCustomModule, RouterModule, FormsModule],
  templateUrl: './enrollments.component.html',
  styleUrl: './enrollments.component.css',
})
export class EnrollmentsComponent implements OnInit {
  enrollments: Enrollment[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadEnrollments();
  }

  loadEnrollments() {
    this.http
      .get<Enrollment[]>('http://localhost:5000/api/enrollments')
      .subscribe({
        next: (res: any) => (this.enrollments = res['data']),
        error: (err) => console.error('Failed to load enrollments', err),
      });
  }
}
