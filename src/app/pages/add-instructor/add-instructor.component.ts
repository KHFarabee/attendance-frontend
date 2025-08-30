import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-add-instructor',
  standalone: true,
  imports: [FormsModule, NzInputModule, NzButtonModule, CommonModule],
  templateUrl: './add-instructor.component.html',
})
export class AddInstructorComponent {
  instructor = { name: '', email: '' };
  loading = false;
  error = '';

  constructor(private http: HttpClient, private router: Router) {}

  addInstructor() {
    this.loading = true;
    this.http
      .post('http://localhost:5000/api/instructors', this.instructor)
      .subscribe({
        next: (res: any) => {
          if (res) this.router.navigate(['/instructors']);
          else this.error = 'Failed to add instructor';
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to add instructor';
          this.loading = false;
        },
      });
  }
}
