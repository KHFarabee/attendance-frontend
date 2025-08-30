import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { saveAs } from 'file-saver';
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

  exportToCSV() {
    const headers = [
      'ID',
      'Student Name',
      'Course Title',
      'Batch Name',
      'Session Date',
      'Status',
    ];
    const rows = this.attendanceRecords.map((record) =>
      [
        record.id,
        record.student_name,
        record.course_title,
        record.batch_name,
        record.session_date,
        record.status,
      ]
        .map((field) => `"${String(field).replace(/"/g, '""')}"`)
        .join(',')
    );
    const csvContent = [headers.join(','), ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'attendance.csv');
  }
}
