import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
constructor() { }
  setItem(keyName: string, keyValue:any): void{
    if (typeof keyValue === 'string'){
      localStorage.setItem(keyName, keyValue)
    }else {
      localStorage.setItem(keyName, JSON.stringify(keyValue))
    }
}
getItem(keyName:string): string | null{
  return localStorage.getItem(keyName)
}
removeItem(keyName:string): void {
  return localStorage.removeItem(keyName)
}
}
