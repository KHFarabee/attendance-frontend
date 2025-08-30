import { Routes } from '@angular/router';
import { AddBatchComponent } from './pages/add-batch/add-batch.component';
import { AddCourseComponent } from './pages/add-course/add-course.component';
import { AddInstructorComponent } from './pages/add-instructor/add-instructor.component';
import { AddStudentComponent } from './pages/add-student/add-student.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { BatchesComponent } from './pages/batches/batches.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { InstructorsComponent } from './pages/instructors/instructors.component';
import { MarkAttendanceComponent } from './pages/mark-attendance/mark-attendance.component';
import { StudentsComponent } from './pages/students/students.component';
import { AddEnrollmentComponent } from './pages/add-enrollment/add-enrollment.component';
import { EnrollmentsComponent } from './pages/enrollments/enrollments.component';

export const routes: Routes = [
  { path: '', redirectTo: 'students', pathMatch: 'full' },
  { path: 'students', component: StudentsComponent },
  { path: 'add-student', component: AddStudentComponent },
  { path: 'instructors', component: InstructorsComponent },
  { path: 'add-instructor', component: AddInstructorComponent },
  { path: 'batches', component: BatchesComponent },
  { path: 'add-batch', component: AddBatchComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'add-course', component: AddCourseComponent },
  { path: 'attendance', component: AttendanceComponent },
  { path: 'mark-attendance', component: MarkAttendanceComponent },
  { path: 'enrollments', component: EnrollmentsComponent },
  { path: 'add-enrollment', component: AddEnrollmentComponent },
];
