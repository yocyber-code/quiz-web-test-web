import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CoreService } from '../../core/core.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { SelectorOption } from '../../components/custom-form-input/custom-select/custom-select.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {
  constructor(private readonly coreService: CoreService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    await this.getDropDown();
    this.setForms();
  }

  async getDropDown() {
    try {
      const resp = await this.coreService.api.user_group.getDropDown();
      this.user_group_options = resp.results;
    } catch (e) {
      console.error(e);
    }
  }

  user_group_options: SelectorOption[] = [];

  form: FormGroup = new FormGroup({});
  model: any = {
    user_group: null,
    username: null,
  };

  fields: FormlyFieldConfig[] = [];

  async setForms() {
    const field = [
      {
        fieldGroupClassName: 'grid grid-cols-2 gap-y-2 gap-x-4 mt-8',
        fieldGroup: [
          {
            key: 'user_group',
            type: 'selectField',
            className: 'col-span-2 w-full',
            props: {
              label: 'User Group',
              required: true,
              hideRequired: true,
              containerClass: 'mb-4 w-full ',
              itemOptions: this.user_group_options,
              labelClass: 'block leading-6 text-gray-800',
              inputClass: 'block h-12 rounded-lg border-2 border-gray-200 py-1.5 font-semibold indent-4 text-lg',
            },
          },
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
      if (!this.model.user_group) {
        this.coreService.utilities.alert.alert('Please select user group');
      } else if (!this.model.username || this.model.username === '') {
        this.coreService.utilities.alert.alert('You have to input name');
      }
      return;
    }

    try {
      const resp = await this.coreService.api.auth.register(this.model.username, Number(this.model.user_group));
      if (resp.results) {
        this.coreService.utilities.alert.alert('Register success!');
        const data = resp.results
        const identity = {
          id: data.id,
          group_id: data.usergroup,
          username: data.username,
        }
        this.coreService.utilities.storage.setIdentity(identity);
        setTimeout(() => {
          this.router.navigate(['/quiz']);
        }, 1000);
      } else {
        this.coreService.utilities.alert.alert('Register fail!');
        return;
      }
    } catch (e: any) {
      this.coreService.utilities.alert.alert('This username has been used. Please try another one.');
    }
  }
}
