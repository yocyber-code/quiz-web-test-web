import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { CoreService } from '../core.service';
import * as IMask from 'imask';
@Injectable({
  providedIn: 'root',
})
export class CoreFormService {
  auditParams = {
    keyword: '',
    column: 'time_stamp',
    order_by: 'desc',
    page: 1,
    pageSize: 5,
  };

  constructor(private coreService: CoreService) {}
  private number = {
    mask: /^[0-9]+$/,
  };
  private minute = {
    mask: Number,
    max: 99,
    signed: false,
    scale: 0,
  };

  private multiple = {
    mask: Number,
    scale: 2,
    signed: false,
    radix: '.',
    max: 999.99,
    mapToRadix: ['.'],
  };

  private numberWithSign = {
    mask: Number,
  };

  private float = {
    mask: Number,
    scale: 10,
    radix: '.',
  };

  private phoneNumber = {
    mask: '000-000-0000',
  };
  private fax = {
    mask: '00-000-0000',
  };
  private citizen = {
    mask: '0-0000-00000-00-0',
  };
  private financial = {
    mask: Number,
    // other options are optional with defaults below
    scale: 2, // digits after point, 0 for integers
    signed: false, // disallow negative
    thousandsSeparator: ',', // any single char
    radix: '.', // fractional delimiter
    mapToRadix: ['.'], // symbols to process as radix
    max: 99999999999999.99,
  };
  private financial_10 = {
    mask: Number,
    unmask: 'typed',
    // other options are optional with defaults below
    scale: 2, // digits after point, 0 for integers
    signed: false, // disallow negative
    thousandsSeparator: ',', // any single char
    radix: '.', // fractional delimiter
    mapToRadix: ['.'], // symbols to process as radix
    max: 9999999999.99,
  };
  private financial_12 = {
    mask: Number,
    // other options are optional with defaults below
    scale: 2, // digits after point, 0 for integers
    signed: false, // disallow negative
    thousandsSeparator: ',', // any single char
    radix: '.', // fractional delimiter
    mapToRadix: ['.'], // symbols to process as radix
    max: 999999999999.99,
  };
  private financial_16 = {
    mask: Number,
    // other options are optional with defaults below
    scale: 2, // digits after point, 0 for integers
    signed: false, // disallow negative
    thousandsSeparator: ',', // any single char
    radix: '.', // fractional delimiter
    mapToRadix: ['.'], // symbols to process as radix
    max: 9999999999999999.99,
  };
  private financialSigned = {
    mask: Number,
    // other options are optional with defaults below
    scale: 2, // digits after point, 0 for integers
    signed: true, // disallow negative
    thousandsSeparator: ',', // any single char
    radix: '.', // fractional delimiter
    mapToRadix: ['.'], // symbols to process as radix
    max: 99999999999999.99,
  };
  private password = {
    mask: String,
  };

  private email = {
    mask: String,
  };

  private percentage = {
    mask: 'num',
    lazy: false,
    blocks: {
      num: {
        mask: Number,
        scale: 2,
        max: 999.99,
        radix: '.',
        mapToRadix: [','],
      },
    },
  };

  private time = {
    overwrite: true,
    autofix: true,
    mask: 'HH:MM',
    blocks: {
      HH: {
        mask: IMask.MaskedRange,
        placeholderChar: 'HH',
        from: 0,
        to: 23,
        maxLength: 2,
      },
      MM: {
        mask: IMask.MaskedRange,
        placeholderChar: 'MM',
        from: 0,
        to: 59,
        maxLength: 2,
      },
    },
  };

  public getFormField = (list: any) => {
    if (list.length > 0) {
      list.forEach((element: any) => {
        this.editFormField(element);
        try {
          // this.editFieldGroup(element)
        } catch (error) {}

        // setCustomSelector()
      });
    }
    return list;
  };
  private editFieldGroup(fields: any) {
    fields.fieldGroup?.forEach((element: any) => {
      if (element.type == 'NestedForm') {
        if (element.fieldArray) {
          this.editFieldGroup(element.fieldArray);
        } else {
        }
      } else if (element.type == 'CustomSelect') {
        if (!element.templateOptions.required) {
          try {
            element.validators = {
              required: [{ isUnSelected: true }],
            };
          } catch (error) {}
        }
      } else {
        this.editFieldGroup(element);
      }
    });
  }

  private editFormField = (field: FormlyFieldConfig) => {
    if (field.templateOptions) {
      // field.modelOptions = { updateOn: 'submit' };
      field = {
        ...field,
        templateOptions: {
          ...field.templateOptions,
          inputContainerClass: field.templateOptions?.['inputContainerClass'] || 'col-12',
          labelContainerClass: field.templateOptions?.['labelContainerClass'] || 'col-12',
        },
      };
    }
    if (field.fieldGroup) {
      field.fieldGroup.forEach((element) => {
        this.editFormField(element);
      });
    }
  };

  public getTimeOptions = (range: number, startTime?: string, endTime?: string) => {
    let resp = [];
    if (startTime == null) {
      startTime = '00:00';
    }
    if (endTime == null) {
      endTime = '24:00';
    }
    let startHour = parseInt(startTime.split(':')[0]);
    let startMin = parseInt(startTime.split(':')[1]);
    let endHour = parseInt(endTime.split(':')[0]);
    let endMin = parseInt(endTime.split(':')[1]);
    let counterH = startHour;
    let counterM = startMin;

    while (counterH <= endHour) {
      let hour = counterH < 10 ? `0${counterH}` : `${counterH}`;
      let minute = counterM < 10 ? `0${counterM}` : `${counterM}`;

      if (counterH == endHour) {
        if (counterM <= endMin) {
          if (endHour != 24) {
            resp.push({
              id: `${hour}:${minute}`,
              name: `${hour}:${minute}`,
            });
          }
        } else {
          counterH++;
        }
      } else {
        resp.push({
          id: `${hour}:${minute}`,
          name: `${hour}:${minute}`,
        });
      }
      counterM += range;
      if (counterM >= 60) {
        counterM -= 60;
        counterH++;
      }
    }
    // // console.log(resp);
    return resp;
  };

  public getDatetoString = (date: Date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  public getStringtoDate = (date: string) => {
    let text = date.split('/');
    return new Date(parseInt(text[2]), parseInt(text[1]) - 1, parseInt(text[0]));
  };

  public getStringtoDateTime = (datetime: string) => {
    let date = datetime.split(' ')[0];
    let time = datetime.split(' ')[1];
    let textdate = date.split('/');
    let texttime = time.split(':');
    return new Date(
      parseInt(textdate[2]),
      parseInt(textdate[1]) - 1,
      parseInt(textdate[0]),
      parseInt(texttime[0]),
      parseInt(texttime[1]),
      parseInt(texttime[2]),
    );
  };

  public changeNumberFieldToString(object: any) {
    if (object === null) return null;
    if (object === undefined) return undefined;
    if (typeof object !== 'object') return object;

    if (object instanceof Array) {
      const arr = [...object];
      arr.forEach((item: any, index: number) => {
        if (typeof item !== 'object') arr[index] = item;
        else if (item instanceof Array) {
          arr[index] = this.changeNumberFieldToString(item);
        } else if (item === null) {
          arr[index] = null;
        } else if (Object.keys(object).length == 0) {
          arr[index] = object;
        } else {
          Object.keys(item).forEach((key: string) => {
            if (typeof item[key] === 'object') {
              item[key] = this.changeNumberFieldToString(item[key]);
            } else if (typeof item[key] === 'number' && !key.includes('id') && !key.includes('status')) {
              item[key] = item[key].toString();
            }
          });
        }
      });
      return arr;
    }

    if (Object.keys(object).length == 0) return object;

    const obj = { ...object };
    Object.keys(obj).forEach((key: string) => {
      if (typeof obj[key] === 'object') {
        obj[key] = this.changeNumberFieldToString(obj[key]);
      } else if (typeof obj[key] === 'number' && !key.includes('id') && !key.includes('status')) {
        obj[key] = obj[key].toString();
      }
    });

    return obj;
  }

  public imaskHelper = {
    currency: {
      imask: this.float,
      parrern: /^[0-9]?[0-9]?(\.[0-9][0-9]?)?/,
    },
    citizenNumber: {
      imask: this.citizen,
    },
    number: {
      imask: this.number,
      pattern: /^(\s*|\d+)$/,
    },
    minute: {
      imask: this.minute,
    },
    multiple: {
      imask: this.multiple,
    },
    financial: {
      imask: this.financial,
    },
    financial_10: {
      imask: this.financial_10,
    },
    financial_12: {
      imask: this.financial_12,
    },
    financial_16: {
      imask: this.financial_16,
    },
    financialSigned: {
      imask: this.financialSigned,
    },
    numberWithSign: {
      imask: { ...this.numberWithSign, signed: true },
      pattern: /^[-,+]?[0-9]+$|^$/,
    },
    percentage: {
      imask: this.percentage,
    },
    phoneNumber: {
      imask: this.phoneNumber,
      pattern: /^(?!00|02)[0-9\-]{12}$/,
    },
    fax: {
      imask: this.fax,
      pattern: /^(\+0?1\s)?\(?\d{2}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
    },
    password: {
      imask: this.password,
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    },
    email: {
      imask: this.email,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    time: {
      imask: this.time,
    },
    couponcode: {
      imask: {
        mask: /^[A-Za-z0-9]+$/,
      },
      pattern: /^[A-Za-z0-9]+$/,
    },
  };

  checkStringOrNumber(val: any): any {
    let type = typeof val;
    if (isNaN(val)) {
      if (type === 'number') {
        return val.toString().stringToFinacial();
      } else {
        return val ? val : '';
      }
    } else {
      if (type === 'string' || type === 'boolean') {
        return val;
      } else {
        return val.toString().stringToFinacial();
      }
    }
  }

  async validateError(error: any, form: any, field: any = null) {
    for (const [keys, value] of Object.entries(error)) {
      // // console.log("796: ",keys);
      keys.split('.').forEach((element) => {
        const strIndex = element.indexOf('[');
        // // console.log("799: ",element, strIndex);
        if (strIndex > -1) {
          let prop = element.substring(0, strIndex).toLowerCase();
          let index = Number(element.substring(strIndex).replaceAll('[', '').replaceAll(']', ''));
          // // console.log("803: ", form, prop, index);
          form = form.get(prop).controls[index];
        } else {
          form.controls[element.toLowerCase()].setErrors({
            api: { message: value },
          });
        }
      });
    }
    setTimeout(async () => {
      if (field) {
        // // console.log("813: ",form);
        await this.scollToToError(form?.controls ?? form, field);
      }
    }, 500);
  }

  async scollToToError(form: any, field: any) {
    for (const key in form) {
      if (form[key].errors) {
        await this.fieldsArrayError(field, key);
        break;
      }
    }
  }

  async fieldsArrayError(forms: any, key: string) {
    if (forms.fieldGroup) {
      forms.fieldGroup.forEach(async (element: any) => {
        await this.fieldsArrayError(element, key);
      });
    } else {
      if (forms[0]) {
        forms.forEach(async (element: any) => {
          await this.fieldsArrayError(element, key);
        });
      } else {
        if (forms.key == key) {
          const div: any = document.getElementById(forms.id);
          div.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  }

  validateErrorByString(message: string) {
    this.coreService.utilities.toast.error(message);
  }

  async triggerError() {
    const forms = document.querySelectorAll('formly-form');
    forms.forEach((item: any) => {
      item.querySelector('input')?.dispatchEvent(new Event('focus'));
    });
  }

  stripHtml(htmlString: string) {
    // Regular expression to match HTML tags
    const regex = /<[^>]+>/g;
    // Replace the HTML tags with an empty string
    return htmlString.replace(regex, '');
  }
}
