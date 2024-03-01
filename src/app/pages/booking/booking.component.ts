import { Component } from '@angular/core'
import { CarouselModule } from 'primeng/carousel'
import { TagModule } from 'primeng/tag'
import { ButtonModule } from 'primeng/button'
@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CarouselModule, TagModule, ButtonModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
})
export class BookingComponent {
  showTimeLists = [
    {
      time: '9:00 PM',
      type: 'dobly',
    },
    {
      time: '9:00 PM',
      type: 'dobly',
    },
    {
      time: '9:00 PM',
      type: 'dobly',
    },
  ]
  showTimingsSelected = 0
  sheets = Array.from({ length: 88 }, (_, index) => index + 1)
}
