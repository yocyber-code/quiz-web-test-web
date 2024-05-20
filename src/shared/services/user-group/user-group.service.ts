import { Injectable } from '@angular/core';
import { CoreService } from '../../../app/core/core.service';

@Injectable({
  providedIn: 'root'
})
export class UserGroupService {
  constructor(private readonly coreService: CoreService) {}

  private readonly path = 'usergroup/';

  public async getDropDown() {
    const resp = await this.coreService.utilities.http.get(this.path + 'get');
    return resp;
  }
}
