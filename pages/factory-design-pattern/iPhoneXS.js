import { Phone } from './Phone.js';

class iPhoneXS {
  constructor(serialNum) {
    return new Phone(serialNum, 'iPhone Xs', '2 Gb', '720p');
  }
}

export { iPhoneXS };