import { Component, OnInit } from '@angular/core';
import { Course } from '../course';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})

export class CourseComponent implements OnInit {

  courses: Course[] = [];

  constructor(private courseService: CourseService) { 

  }

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(): void {
    this.courseService.getCourses().subscribe(
      courses => this.courses = courses 
    );
  }

  delete(course: Course): void {
    this.courseService.deleteCourse(course.id).subscribe(
      _ => {
        this.courses = this.courses.filter(c => c !== course);        
      }
    );
  }

  addToInProgress(course: Course): void {
    if(course.inProgress){
      return;
    }        
    this.courseService.addToInProgress(course).subscribe();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.courseService.addCourse({ name } as Course).subscribe(
      course => {
        this.courses.push(course);
      }
    )
  }

}
