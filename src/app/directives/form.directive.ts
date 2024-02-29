import { Directive, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';

@Directive({
  selector: 'form',
  standalone: true,
})
export class FormDirective implements OnInit {
  private readonly ngForm: NgForm = inject(NgForm);
  @Output() formValueChange: EventEmitter<FormGroup> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.ngForm.valueChanges?.subscribe(() => {
      this.formValueChange.emit(this.ngForm.form);
    });
  }
}
