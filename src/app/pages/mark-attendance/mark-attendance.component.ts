import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import moment from 'moment-timezone';
import { NgZorroCustomModule } from '../../ng-zorro-custom.module';

@Component({
  selector: 'app-mark-attendance',
  standalone: true,
  imports: [CommonModule, NgZorroCustomModule, RouterModule, FormsModule],
  templateUrl: './mark-attendance.component.html',
  styleUrls: ['./mark-attendance.component.css'], // <-- fixed typo
})
export class MarkAttendanceComponent implements OnInit {
  batches: any[] = [];
  courses: any[] = [];
  students: any[] = [];
  selectedBatch: number | null = null;
  selectedCourse: number | null = null;
  attendanceMap: { [studentId: number]: string } = {};
  loading = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadBatches();
    this.loadCourses();
  }

  loadBatches() {
    this.http
      .get('http://localhost:5000/api/batches')
      .subscribe((data: any) => (this.batches = data));
  }

  loadCourses() {
    this.http
      .get('http://localhost:5000/api/courses')
      .subscribe((data: any) => (this.courses = data));
  }

  loadStudents() {
    if (!this.selectedBatch || !this.selectedCourse) return;
    this.http
      .get(`http://localhost:5000/api/students?batch_id=${this.selectedBatch}`)
      .subscribe((data: any) => {
        this.students = data;
        this.attendanceMap = {};
        this.students.forEach((s) => (this.attendanceMap[s.id] = 'Present')); // default status
      });
  }

  submitAttendance() {
    if (!this.selectedBatch || !this.selectedCourse) {
      alert('Please select both batch and course');
      return;
    }
    const payload = this.students.map((s: any) => ({
      student_id: s.id,
      batch_id: this.selectedBatch,
      course_id: this.selectedCourse,
      session_date: moment().tz('Asia/Dhaka').format('YYYY-MM-DD'), // ensure timezone consistency
      status: this.attendanceMap[s.id],
    }));
    console.log(payload);
    this.loading = true;
    this.http.post('http://localhost:5000/api/attendance', payload).subscribe({
      next: () => {
        this.loading = false;
        alert('Attendance submitted successfully');
      },
      error: (err) => {
        this.loading = false;
        console.error('Failed to submit attendance', err);
        alert('Failed to submit attendance. Check console for details.');
      },
    });
  }
}
