import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { timeout, retry, tap } from 'rxjs/operators';
import { CoreService } from '../core.service';
import { lastValueFrom } from 'rxjs';
import { isEmpty } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class CoreHttpService {
  private timeoutTime = 30000;
  private lastUrl: string = '';
  private lastTime: number = 0;
  private selectorCache: Map<string, any> = new Map<string, any>();

  constructor(private http: HttpClient, private coreService: CoreService) {}

  async setHeader() {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return headers;
  }

  async get(url: string, params?: any, headers?: HttpHeaders, endpointURL?: string | null): Promise<any> {
    endpointURL = endpointURL ?? this.coreService.utilities.environment.setting.endpoint;
    if (params) {
      const keys = Object.keys(params);
      for (const key of keys) {
        if (params[key] === undefined) delete params[key];
      }
    }

    const Querystring: string = this.jsonToQueryString(params);
    const endpoint: string = endpointURL + url + Querystring;

    const cache = this.selectorCache.get(endpoint);
    if (cache) return Promise.resolve(cache);

    if (url.includes('/selector/') && this.lastUrl === url && Date.now() - this.lastTime < 500) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      this.lastUrl = url;
      this.lastTime = Date.now();
    }

    return lastValueFrom(
      this.http.get(endpoint, { headers: headers ?? (await this.setHeader()) }).pipe(
        timeout(this.timeoutTime),
        tap((resp: any) => {
          if (resp.Code === 200 && url.includes('/selector/')) {
            this.selectorCache.set(endpoint, resp);
          }
        }),
      ),
    );
  }

  async post(url: string, body?: any, headers?: HttpHeaders, endpointURL?: string | null): Promise<any> {
    endpointURL = endpointURL ?? this.coreService.utilities.environment.setting.endpoint;

    if (isEmpty(endpointURL)) endpointURL = null;
    const endpoint: string = endpointURL + url;
    return lastValueFrom(
      this.http
        .post(endpoint, body, { headers: headers ?? (await this.setHeader()) })
        .pipe(timeout(this.timeoutTime)),
    );
  }

  async getDownload(url: string, body: any, name?: string): Promise<any> {
    this.coreService.utilities.toast.info('กำลังโหลดเอกสาร');

    this.http
      .post(this.coreService.utilities.environment.setting.endpoint + url, body, {
        observe: 'response',
        responseType: 'blob' as 'json',
        headers: await this.setHeader(),
      })
      .subscribe({
        next: (response: HttpResponse<any>) => {
          this.coreService.utilities.toast.success('โหลดเอกสารเรียบร้อย');
          const contentDisposition: any = response.headers.get('content-disposition');
          let filename = '';
          if (contentDisposition && contentDisposition.indexOf('attachment') !== -1) {
            let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            let matches = filenameRegex.exec(contentDisposition);
            if (!!matches && matches[1]) {
              filename = matches[1].replace(/['"]/g, '');
            }
          }
          this.downLoadFile(response.body, filename);
        },
        error: (error: any) => {
          this.coreService.utilities.toast.error('ไม่สามารถโหลดเอกสารได้');
        },
      });
  }

  downLoadFile(data: any, name: string) {
    const a = document.createElement('a');
    document.body.appendChild(a);
    const url = window.URL.createObjectURL(data);
    a.href = url;
    a.download = name;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  async getImageFile(url: string) {
    const file = await lastValueFrom(this.http.get(url, { responseType: 'blob' }));
    return file;
  }
  createImageFromBlob(image: any) {
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        // Use the loaded image as needed, e.g., set it as the source for an <img> element
        const imageSource = reader.result as string;
      },
      false,
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  private jsonToQueryString(body: any) {
    if (!body) return '';
    const params = new URLSearchParams();
    Object.keys(body).forEach((key) => {
      params.append(key, body[key]);
    });
    if (isEmpty(params.toString())) return '';
    return '?' + params.toString();
  }
}
