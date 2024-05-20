import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class CoreToastService {
    constructor(
        private readonly toastr: ToastrService
    ) {
    }
    public info(message: any, option?: any) {
        this.toastr.info(message, '', option);
    }
    public success(message: any, option?: any) {
        this.toastr.success(message, '', option);
    }
    public error(message: any, option?: any) {
        this.toastr.error(message ?? "มีบางอย่างผิดพลาดโปรดติดต่อเจ้าหน้าที่", '', option);
    }
    public checkStatus() {
        return this.toastr.currentlyActive;
    }
    public someThingWasWrong() {
        this.toastr.warning("มีบางอย่างผิดพลาดโปรดติดต่อเจ้าหน้าที่");
    }
}
