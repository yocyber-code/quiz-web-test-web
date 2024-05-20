import { Injectable } from '@angular/core';
import * as IMask from 'imask';

@Injectable({
  providedIn: 'root',
})
export class CoreImaskService {
  private number = {
    mask: Number,
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
    scale: 2,
    signed: false,
    thousandsSeparator: ',',
    radix: '.',
    mapToRadix: ['.'],
    max: 999999.99,
    min: 0,
  };

  private password = {
    mask: String,
  };

  private email = {
    mask: String,
  };

  private percentage = {
    mask: 'num%',
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

  public imaskHelper = {
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
    numberWithSign: {
      imask: { ...this.numberWithSign, signed: true },
      pattern: /^[-,+]?[\d]+$|^$/,
    },
    percentage: {
      imask: this.percentage,
    },
    phoneNumber: {
      imask: this.phoneNumber,
      pattern: /^(?!00|02)[\d\-]{12}$/,
    },
    fax: {
      imask: this.fax,
      pattern: /^(\+0?1\s)?\(?\d{2}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
    },
    password: {
      imask: this.password,
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    },
    time: {
      imask: this.time,
    },
    thai: {
      pattern: /^[\u0E00-\u0E7F\d\s][\u0E00-\u0E7F\d\s]*$/,
    },
    english: {
      pattern: /^[a-zA-Z\d\s]+$/,
    },
    email: {
      imask: this.email,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
  };
}
