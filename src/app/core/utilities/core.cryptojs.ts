import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';


@Injectable({
    providedIn: 'root'
})
export class CoreCryptoJSService {

    // tslint:disable-next-line: variable-name
    private keys: any = {
        chat: '$pO0d@ir0Q019Mn='
    };
    private keySize = 128 / 8;

    constructor() {
    }

    public encrypt(data: any, objectKey: string) {

        try {
            const salt = this.keys[objectKey];
            const key = CryptoJS.enc.Utf8.parse(salt);
            const iv = CryptoJS.enc.Utf8.parse(salt);
            const encryptData = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), key, { keySize: this.keySize, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
            return encryptData ? encryptData.toString() : data;
        } catch (error) {
            return data;
        }
    }

    public decrypt(data: any, objectKey: string) {

        try {
            const salt = this.keys[objectKey];
            const key = CryptoJS.enc.Utf8.parse(salt);
            const iv = CryptoJS.enc.Utf8.parse(salt);
            const decryptData = (CryptoJS.AES.decrypt(data, key, { keySize: this.keySize, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })).toString(CryptoJS.enc.Utf8);
            return decryptData || data;
        } catch (error) {
            return data;
        }

    }

}