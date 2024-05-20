import { Injectable } from '@angular/core';
import { twMerge } from 'tailwind-merge';
import { isEmpty } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class CoreTailwindService {
  public tailwindMerge(oldTailwind: string, newTailwind: string) {
    if (isEmpty(oldTailwind) && isEmpty(newTailwind)) return '';
    if (isEmpty(oldTailwind)) return newTailwind;
    if (isEmpty(newTailwind)) return oldTailwind;
    return twMerge(oldTailwind, newTailwind);
  }

  public addClass(element: HTMLElement, classNames: string[]): void {
    if (!element) return;
    classNames.forEach((className: string) => {
      if (className.trim() !== '') {
        element.classList.add(className);
      }
    });
  }

  public removeClass(element: HTMLElement, classNames: string[]): void {
    if (!element) return;
    classNames.forEach((className: string) => {
      if (className.trim() !== '') {
        element.classList.remove(className);
      }
    });
  }
}
