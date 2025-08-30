import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgZorroCustomModule } from '../../ng-zorro-custom.module';

@Component({
  selector: 'app-add-batch',
  standalone: true,
  imports: [FormsModule, CommonModule, NgZorroCustomModule],
  templateUrl: './add-batch.component.html',
})
export class AddBatchComponent {
  batch = { name: '', year: null };
  loading = false;
  error = '';

  constructor(private http: HttpClient, private router: Router) {}

  addBatch() {
    this.loading = true;
    this.http.post('http://localhost:5000/api/batches', this.batch).subscribe({
      next: (res: any) => {
        if (res) this.router.navigate(['/batches']);
        else this.error = 'Failed to add batch';
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to add batch';
        this.loading = false;
      },
    });
  }
}
