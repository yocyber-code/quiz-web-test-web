import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { initDropdowns, initFlowbite } from 'flowbite';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title: BehaviorSubject<string> = new BehaviorSubject<string>('quiz web');
  constructor(private router: Router, private titleService: Title) {
    router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route: ActivatedRoute = this.router.routerState.root;
          let routeTitle = '';

          while (route.firstChild) {
            route = route.firstChild;
          }
          if (route.snapshot.data['title']) {
            routeTitle = route.snapshot.data['title'];
          }
          return { title: routeTitle };
        })
      )
      .subscribe((value: any) => {
        if (value.title) {
          this.setTitle(value.title);
          this.titleService.setTitle(value.title);
        } else {
          this.setTitle('app');
          this.titleService.setTitle('app');
        }
      });
  }

  ngOnInit(): void {
    initFlowbite();
    initDropdowns();
  }

  setTitle(value: string) {
    this.title.next(value);
  }

  getTitle(): Observable<string> {
    return this.title.asObservable();
  }
}
