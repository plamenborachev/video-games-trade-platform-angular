import { Component, Input, OnInit, signal } from '@angular/core';
import { ErrorMsgService } from './error-message.service';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.css'
})
export class ErrorMessageComponent implements OnInit{
  // @Input() errorMessage: string = "";

  errorMsg = signal('');
  constructor(private errorMsgService: ErrorMsgService) {}

  ngOnInit(): void {
    this.errorMsgService.apiError$.subscribe((err: any) => {
      this.errorMsg.set(err?.message);
    });
  }
}