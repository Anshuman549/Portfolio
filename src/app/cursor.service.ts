import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursorService {
  private cursorPosition = new BehaviorSubject<{ x: number; y: number }>({ x: 0, y: 0 });
  private cursorVisible = new BehaviorSubject<boolean>(true);

  cursorPosition$ = this.cursorPosition.asObservable();
  cursorVisible$ = this.cursorVisible.asObservable();

  updateCursorPosition(x: number, y: number): void {
    this.cursorPosition.next({ x, y });
  }

  setCursorVisibility(visible: boolean): void {
    this.cursorVisible.next(visible);
  }
}
