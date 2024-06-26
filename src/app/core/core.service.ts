import { Injectable, Injector } from '@angular/core';
import { CoreStorageService } from './utilities/core.storage';
import { CoreCryptoJSService } from './utilities/core.cryptojs';
import { CoreAlertService } from './utilities/core.alert';
import { CoreToastService } from './utilities/core.toast';
import { CoreHttpService } from './utilities/core.http';
import { CoreEnvironmentService } from './utilities/core.environment';
import { CoreTailwindService } from './utilities/core.tailwind';
import { CoreImaskService } from './utilities/core.imask';
import { CoreFormService } from './utilities/core.form';
import { AuthService } from '../../shared/services/auth/auth.service';
import { UserGroupService } from '../../shared/services/user-group/user-group.service';
import { QuizService } from '../../shared/services/quiz/quiz.service';

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
      form: this.injector.get(CoreFormService),
    };
  }

  public get api() {
    return {
      auth: this.injector.get(AuthService),
      user_group: this.injector.get(UserGroupService),
      quiz: this.injector.get(QuizService),
    };
  }
}
