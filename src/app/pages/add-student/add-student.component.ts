import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';

interface Batch {
  id: number;
  name: string;
}

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [
    FormsModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NgIf,
    NgFor,
  ],
  templateUrl: './add-student.component.html',
})
export class AddStudentComponent implements OnInit {
  student = {
    roll_no: '',
    name: '',
    email: '',
    phone: '',
    status: 'ACTIVE',
    batch_id: null,
  };
  loading = false;
  error = '';
  batches: Batch[] = [];
  statusOptions = ['Active', 'Inactive', 'Graduated', 'Dropped'];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loadBatches();
  }

  loadBatches() {
    this.http
      .get<{ success: boolean; data: Batch[] }>(
        'http://localhost:5000/api/batches'
      )
      .subscribe({
        next: (res: any) => {
          if (res) this.batches = res;
          else this.error = 'Failed to load batches';
        },
        error: () => (this.error = 'Failed to load batches'),
      });
  }

  addStudent() {
    this.loading = true;
    this.http
      .post('http://localhost:5000/api/students', this.student)
      .subscribe({
        next: (res: any) => {
          if (res) this.router.navigate(['/students']);
          else this.error = 'Failed to add student';
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to add student';
          this.loading = false;
        },
      });
  }
}
