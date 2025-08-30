import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgZorroCustomModule } from '../../ng-zorro-custom.module';

interface AttendanceRecord {
  id: number;
  student_name: string;
  course_title: string;
  batch_name: string;
  session_date: string;
  status: string;
}
@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, NgZorroCustomModule, RouterModule],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css',
})
export class AttendanceComponent implements OnInit {
  attendanceRecords: AttendanceRecord[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadAttendance();
  }

  loadAttendance() {
    this.http
      .get<AttendanceRecord[]>('http://localhost:5000/api/attendance')
      .subscribe({
        next: (data) => (this.attendanceRecords = data),
        error: (err) => console.error('Failed to load attendance', err),
      });
  }
}
