import { Component, HostListener, Renderer2, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})

export class EducationComponent implements AfterViewInit, OnDestroy {
  private windowHeight: number = 0;
  private elements!: NodeListOf<Element>;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit(): void {
    // Get all elements with the class names 'each-event' and 'title'
    this.elements = this.el.nativeElement.querySelectorAll('.each-event,.each-event1, .title');

    // Initial trigger to check fade state
    this.checkForFade();
  }

  ngOnDestroy(): void {
    // Clean up if needed (e.g., unsubscribe from any services, or listeners)
  }

  @HostListener('window:scroll', ['$event'])
  @HostListener('window:resize', ['$event'])
  onWindowEvent(): void {
    this.checkForFade();
  }

  checkForFade(): void {
    this.windowHeight = window.innerHeight;

    this.elements.forEach((element: Element) => {
      const elementRef = element as HTMLElement;
      const elementHeight = elementRef.offsetHeight;
      const elementOffset = elementRef.getBoundingClientRect().top + window.scrollY;
      const space = this.windowHeight - (elementHeight + elementOffset - window.scrollY);

      if (space < 60) {
        this.renderer.addClass(element, 'non-focus');
      } else {
        this.renderer.removeClass(element, 'non-focus');
      }
    });
  }
}