import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgZorroCustomModule } from '../../ng-zorro-custom.module';

interface Batch {
  id: number;
  name: string;
}

@Component({
  selector: 'app-batches',
  standalone: true,
  imports: [NgZorroCustomModule, CommonModule, RouterModule],
  templateUrl: './batches.component.html',
})
export class BatchesComponent implements OnInit {
  batches: Batch[] = [];
  loading = false;
  error = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadBatches();
  }

  loadBatches() {
    this.loading = true;
    this.http
      .get<{ success: boolean; data: Batch[] }>(
        'http://localhost:5000/api/batches'
      )
      .subscribe({
        next: (res: any) => {
          if (res) this.batches = res;
          else this.error = 'Failed to load batches';
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load batches';
          this.loading = false;
        },
      });
  }
}
