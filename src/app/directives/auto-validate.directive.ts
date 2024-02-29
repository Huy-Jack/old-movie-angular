import { Directive, ElementRef, Renderer2, OnInit, inject, Input } from '@angular/core'
import { NgControl, ValidatorFn } from '@angular/forms'
import { validateMessage } from '@constants/validate-message.constant'

@Directive({
  selector: '[autoValidate]',
  standalone: true,
})
export class AutoValidateDirective implements OnInit {
  @Input() customValidation: ValidatorFn[] = []

  private errorMessageElement!: HTMLElement
  private el: ElementRef = inject(ElementRef)
  private renderer: Renderer2 = inject(Renderer2)
  private control: NgControl = inject(NgControl)
  ngOnInit(): void {
    this.errorMessageElement = document.createElement('small')
    this.errorMessageElement.classList.add('p-error')
    this.control.statusChanges?.subscribe(() => {
      this.updateErrorMessage()
    })
    this.control.control?.setValidators(this.customValidation)
  }

  private updateErrorMessage() {
    this.errorMessageElement.innerHTML = ''
    if (this.control.invalid && this.control.dirty) {
      const errors = Object.keys(this.control.errors ?? {})
      for (const error of errors) {
        this.errorMessageElement.innerHTML += this.getErrorMessage(error)
      }
    }
    const previousErrorMessage = this.el.nativeElement.nextElementSibling
    if (previousErrorMessage && previousErrorMessage.classList.contains('p-error')) {
      this.renderer.removeChild(this.el.nativeElement.parentElement, previousErrorMessage)
    }
    this.renderer.appendChild(this.el.nativeElement.parentElement, this.errorMessageElement)
  }

  private getErrorMessage(error: string): string {
    return validateMessage[error]
  }
}
