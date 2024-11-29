import { Component, ElementRef, AfterViewInit, ViewChild} from '@angular/core';
import Typed from 'typed.js';
import { EducationComponent } from '../../education/education.component';
import { ProjectsComponent } from '../../projects/projects.component';
import { ContactFormComponent } from '../../contact/contact.component';
import { FooterComponent } from '../../footer/footer.component';
import { AdminComponent } from '../../admin/admin.component';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';

declare var VanillaTilt: any;


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [EducationComponent,ProjectsComponent,ContactFormComponent,FooterComponent,AdminComponent,RouterLink,RouterOutlet,RouterLinkActive,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements AfterViewInit {

  @ViewChild('menuIcon') menuIcon!: ElementRef<HTMLDivElement>;
  @ViewChild('navbar') navbar!: ElementRef<HTMLElement>;

  constructor() {}

  ngAfterViewInit(): void {
    this.menuIcon.nativeElement.onclick = () => {
      this.menuIcon.nativeElement.classList.toggle('bx-x');
      this.navbar.nativeElement.classList.toggle('active');
    };

    const typed = new Typed('.text', {
      strings: ["Full Stack Developer"],
      typeSpeed: 10,
      backSpeed: 100,
      backDelay: 1000,
      loop: true,
    });


    VanillaTilt.init(document.querySelectorAll('.glassmorphism-box'), {
      max: 25,
      speed: 100,
      glare: true,
      'max-glare': 0.5,
    });



  }


}
