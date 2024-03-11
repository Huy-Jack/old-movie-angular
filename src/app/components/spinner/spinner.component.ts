import { Component, inject } from '@angular/core'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { LoadingService } from '@services/loading/loading.service'
import { AsyncPipe } from '@angular/common'

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [ProgressSpinnerModule, AsyncPipe],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
})
export class SpinnerComponent {
  private loadingService: LoadingService = inject(LoadingService)

  isLoading$ = this.loadingService.loading$
}
