import { Component } from '@angular/core';
import { CoreService } from '../../core/core.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  constructor(private readonly coreService: CoreService, private readonly router: Router) {}

  ngOnInit(): void {
    this.setForms();
  }

  form: FormGroup = new FormGroup({});
  model: any = {
    username: null,
  };

  fields: FormlyFieldConfig[] = [];

  async setForms() {
    const field = [
      {
        fieldGroupClassName: 'grid grid-cols-2 gap-y-2 gap-x-4 mt-8',
        fieldGroup: [
          {
            key: 'username',
            type: 'inputField',
            className: 'col-span-2',
            props: {
              label: 'Name',
              type: 'text',
              required: true,
              hideRequired: true,
              containerClass: 'mb-4 w-full',
              labelClass: 'block leading-6 text-gray-800',
              inputClass: 'block w-full h-12 rounded-lg border-2 border-gray-200 py-1.5 font-semibold indent-4 text-lg',
            },
          },
        ],
      },
    ];

    this.fields = this.coreService.utilities.form.getFormField(field);
  }

  async submit() {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      if (!this.model.username || this.model.username === '') {
        this.coreService.utilities.alert.alert('You have to input name');
      }
      return;
    }
    try {
      const resp = await this.coreService.api.auth.login(this.model.username);
      if (resp.results) {
        const data = resp.results;
        const identity = {
          id: data.id,
          group_id: data.group,
          username: data.username,
        };
        this.coreService.utilities.storage.setIdentity(identity);
        this.coreService.utilities.alert.alert('Login success!');
        setTimeout(() => {
          this.router.navigate(['/quiz']);
        }, 1000);
      }
    } catch (e) {
      this.coreService.utilities.alert.alert('User not found');
    }
  }
}
