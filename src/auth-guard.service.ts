import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { CoreService } from './app/core/core.service';

@Injectable()
export class AuthGuardService {
  constructor(private router: Router, private coreService: CoreService) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const url: string = state.url;
    const identity = await this.coreService.utilities.storage.getIdentity();

    return true;
  }
}
