import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgZorroCustomModule } from '../../ng-zorro-custom.module';

interface Instructor {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-instructors',
  standalone: true,
  imports: [CommonModule, RouterModule, NgZorroCustomModule],
  templateUrl: './instructors.component.html',
})
export class InstructorsComponent implements OnInit {
  instructors: Instructor[] = [];
  loading = false;
  error = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadInstructors();
  }

  loadInstructors() {
    this.loading = true;
    this.http
      .get<{ success: boolean; data: Instructor[] }>(
        'http://localhost:5000/api/instructors'
      )
      .subscribe({
        next: (res: any) => {
          if (res) this.instructors = res;
          else this.error = 'Failed to load instructors';
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load instructors';
          this.loading = false;
        },
      });
  }
}
