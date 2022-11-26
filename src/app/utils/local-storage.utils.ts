import { tryParseJSON } from "./json";

export class LS {

  static setItem(key: string, value: any): void {
    value = JSON.stringify(value);
  
    localStorage.setItem(
      LS.b64Encode(key), LS.b64Encode(value)
    );
  }
  
  static getItem(key: string) {
    const value = localStorage.getItem(LS.b64Encode(key));
    
    return value==undefined? undefined : tryParseJSON(LS.b64Decode(value));
  }
  
  static remove(key: string) {
    localStorage.removeItem(LS.b64Encode(key));
  }
  
  private static b64Encode(data: string) {
    // return btoa(data);
    return data;
  }
  
  private static b64Decode(data: string) {
    // return atob(data);
    return data;
  }
}