import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { Banner } from '@interfaces/banner.interface'
import { AuthService } from '@services/auth/auth.service'
import { BannerService } from '@services/banner/banner.service'
import { ButtonModule } from 'primeng/button'
import { CarouselModule } from 'primeng/carousel'
import { CardModule } from 'primeng/card'
import { Movie } from '@interfaces/movie.interface'
import { MovieService } from '@services/movie/movie.service'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, CarouselModule, CardModule],
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
    this.bannerService.getAllBanners().subscribe((res) => {
      this.banners = res
    })
    this.movieService.getOngoingMovie({ ongoing: true }).subscribe((res) => {
      this.ongoingMovies = res
    })
    this.movieService.getOngoingMovie({ ongoing: false }).subscribe((res) => {
      this.upcomingMovies = res
    })
  }

  signout() {
    this.authService.signout()
  }

  onBookClick(movie: Movie) {
    this.movieService.currentMovie = movie
    this.router.navigateByUrl('/detail')
  }
}
