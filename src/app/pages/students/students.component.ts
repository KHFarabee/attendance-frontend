import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgZorroCustomModule } from '../../ng-zorro-custom.module';

interface Student {
  id: number;
  roll_no: string;
  name: string;
  email: string;
  phone: string;
  status: string;
}

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, RouterLink, NgZorroCustomModule],
  templateUrl: './students.component.html',
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  loading = false;
  error = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.loading = true;
    this.http
      .get<{ success: boolean; data: Student[] }>(
        'http://localhost:5000/api/students'
      )
      .subscribe({
        next: (res: any) => {
          if (res) {
            this.students = res;
          } else {
            this.error = 'Failed to load students';
          }
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load students';
          this.loading = false;
        },
      });
  }
}
