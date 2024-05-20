import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})

export class CoreEnvironmentService {
    public setting = environment;
}
