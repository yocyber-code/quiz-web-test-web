import { Injectable } from '@angular/core';
import { CoreService } from '../../../app/core/core.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly coreService: CoreService) {}

  private readonly path = 'auth/';

  public async register(username: string, group_id: number) {
    const params = {
      username: username,
      group_id: group_id,
    };
    const resp = await this.coreService.utilities.http.post(this.path + 'register', params);
    return resp;
  }

  public async login(username: string) {
    const params = {
      username: username
    };
    const resp = await this.coreService.utilities.http.post(this.path + 'login', params);
    return resp;
  }
}
