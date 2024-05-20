import { Injectable, Injector } from '@angular/core';
import { CoreStorageService } from './utilities/core.storage';
import { CoreCryptoJSService } from './utilities/core.cryptojs';
import { CoreAlertService } from './utilities/core.alert';
import { CoreToastService } from './utilities/core.toast';
import { CoreHttpService } from './utilities/core.http';
import { CoreEnvironmentService } from './utilities/core.environment';
import { CoreTailwindService } from './utilities/core.tailwind';
import { CoreImaskService } from './utilities/core.imask';
import { CoreAddressService } from './utilities/core.address';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  constructor(private readonly injector: Injector) {}

  public get utilities() {
    return {
      storage: this.injector.get(CoreStorageService),
      crypto: this.injector.get(CoreCryptoJSService),
      alert: this.injector.get(CoreAlertService),
      toast: this.injector.get(CoreToastService),
      http: this.injector.get(CoreHttpService),
      environment: this.injector.get(CoreEnvironmentService),
      tailwind: this.injector.get(CoreTailwindService),
      imask: this.injector.get(CoreImaskService),
      address: this.injector.get(CoreAddressService),
    };
  }

  public get api() {
    return {

    };
  }
}
