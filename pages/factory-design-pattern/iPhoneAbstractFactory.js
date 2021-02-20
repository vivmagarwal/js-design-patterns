import { iPhoneS } from "./iPhoneS.js"; 
import { iPhoneXS } from "./iPhoneXS.js"; 
import { iPhoneXR } from "./iPhoneXR.js"; 

class iPhoneAbstractFactory {
  create(type, serialNum) {
    switch (type) {
      case 's':
        return new iPhoneS(serialNum);
      case 'xs':
        return new iPhoneXS(serialNum);
      case 'xr':
        return new iPhoneXR(serialNum);
      default: 
        console.log('Unknown type...');
    }
  }
}

const iPhoneAbstractFactorySingleton = new iPhoneAbstractFactory;

export { iPhoneAbstractFactorySingleton as iPhoneAbstractFactory };