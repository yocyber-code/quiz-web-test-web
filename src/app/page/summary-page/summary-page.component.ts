import { Component } from '@angular/core';
import { CoreService } from '../../core/core.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrl: './summary-page.component.scss',
})
export class SummaryPageComponent {
  constructor(private readonly coreService: CoreService, private readonly router: Router) {}

  username: string = '';
  score: number = 0;
  rank: number = 0;

  async ngOnInit(): Promise<void> {
    const identity = this.coreService.utilities.storage.getIdentity();
    const resp = await this.coreService.api.quiz.getSummary(identity.id, identity.username, identity.group_id);
    console.log(resp);
    if (resp.results) {
      this.username = resp.results.username;
      this.score = resp.results.score;
      this.rank = resp.results.rank;
    } else {
      this.router.navigate(['/home']);
    }
  }
}
