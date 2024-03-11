import { CommonModule } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { Banner } from '@interfaces/banner.interface'
import { Movie } from '@interfaces/movie.interface'
import { AuthService } from '@services/auth/auth.service'
import { BannerService } from '@services/banner/banner.service'
import { MovieService } from '@services/movie/movie.service'
import { ButtonModule } from 'primeng/button'
import { CardModule } from 'primeng/card'
import { CarouselModule } from 'primeng/carousel'
import { forkJoin, shareReplay } from 'rxjs'
import { LoadingService } from '@services/loading/loading.service'
import { SpinnerComponent } from '@components/spinner/spinner.component'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, CarouselModule, CardModule, SpinnerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  banners: Banner[] = []
  ongoingMovies: Movie[] = []
  upcomingMovies: Movie[] = []

  constructor(
    private router: Router,
    private authService: AuthService,
    private bannerService: BannerService,
    private movieService: MovieService,
  ) {}

  ngOnInit(): void {
    forkJoin({
      banners: this.bannerService.getAllBanners(),
      ongoingMovies: this.movieService.getMovies({ ongoing: true }),
      upcomingMovies: this.movieService.getMovies({ ongoing: false }),
    })
      .pipe(shareReplay(1))
      .subscribe(({ banners, ongoingMovies, upcomingMovies }) => {
        this.banners = banners
        this.ongoingMovies = ongoingMovies
        this.upcomingMovies = upcomingMovies
      })
  }

  signout() {
    this.authService.signout()
  }

  onBookClick(movie: Movie) {
    this.router.navigateByUrl(`/detail/${movie.id}`)
  }
}
