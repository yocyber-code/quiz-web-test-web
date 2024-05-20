import { Injectable } from '@angular/core';
import { CoreService } from '../core.service';
import { BehaviorSubject } from 'rxjs';
import { CartUpdateItem, CartUpdateReqDTO } from '../../shared/services/cart/cart.service';
import { AddressModalComponent } from '../../components/modal/address-modal/address-modal.component';

@Injectable({
  providedIn: 'root',
})
export class CoreAddressService {
  cartItemCouter$!: BehaviorSubject<number>;

  constructor(private readonly coreService: CoreService) {}

  async change(func: any) {
    return await this.coreService.utilities.modal.open({
      component: AddressModalComponent,
      data: {
        model: {},
        onClose: (item: any) => {
          func(item);
        },
        templateOptions: {
          showHeader: true,
          showCloseBtn: true,
        },
      },
      config: null,
    });
  }
}
