import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { CursorService } from '../cursor.service';

@Component({
  selector: 'app-custcursor',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './custcursor.component.html',
  styleUrl: './custcursor.component.css'
})
export class CustcursorComponent implements OnInit {
  cursor!: HTMLElement;
  cursorVisible: boolean = true;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.cursor = this.renderer.selectRootElement('.cursor', true);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.renderer.setStyle(this.cursor, 'top', `${event.clientY}px`);
    this.renderer.setStyle(this.cursor, 'left', `${event.clientX}px`);
  }

  @HostListener('mousedown')
  onMouseDown(): void {
    this.renderer.setStyle(this.cursor, 'transform', 'scale(1.5)');
  }

  @HostListener('mouseup')
  onMouseUp(): void {
    this.renderer.setStyle(this.cursor, 'transform', 'scale(1)');
  }
}