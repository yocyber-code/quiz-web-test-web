import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import CryptoJS from 'crypto-js';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class CoreStorageService {
  secureKey = 'app';
  storageName = 'app';
  appKey: any = '';
  constructor() {
    setTimeout(() => {
      this.appKey = this.decrypt(this.storageName + '/');
    }, 300);
  }

  getItem(key: string) {
    return JSON.parse(this.decrypt(window.localStorage.getItem(this.appKey + key)) ?? 'null');
  }

  setItem(key: string, value: any) {
    window.localStorage.setItem(this.appKey + key, this.encrypt(JSON.stringify(value)));
  }

  removeItem(key: string) {
    window.localStorage.removeItem(this.appKey + key);
  }

  clear() {
    window.localStorage.clear();
  }

  encrypt(value: any) {
    return CryptoJS.AES.encrypt(value, this.secureKey).toString();
  }

  decrypt(value: any) {
    return value ? CryptoJS.AES.decrypt(value, this.secureKey).toString(CryptoJS.enc.Utf8) : null;
  }

  encryption(str: any) {
    const key = CryptoJS.enc.Utf8.parse('app');
    const iv = CryptoJS.enc.Utf8.parse('app');
    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(str), key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  }

  setToken(data: any) {
    this.setItem('token', data);
  }
  getToken() {
    return this.getItem('token');
  }
  resetToken() {
    this.removeItem('token');
  }

  setUser(data: any) {
    this.setItem('user', data);
  }
  getUser() {
    return this.getItem('user');
  }
  resetUser() {
    this.removeItem('user');
  }

  setTokenType(data: any) {
    this.setItem('tokenType', data);
  }
  getTokenType() {
    return this.getItem('tokenType');
  }
  resetTokenType() {
    this.removeItem('tokenType');
  }
}
