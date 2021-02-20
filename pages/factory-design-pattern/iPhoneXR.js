import { Phone } from './Phone.js';

class iPhoneXR {
  constructor(serialNum) {
    return new Phone(serialNum, 'iPhone Xr', '3 Gb', '1080p');
  }
}

export { iPhoneXR };