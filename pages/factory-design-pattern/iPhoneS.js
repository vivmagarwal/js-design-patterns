import { Phone } from './Phone.js';

class iPhoneS {
  constructor(serialNum) {
    return new Phone(serialNum, 'iPhone S', '1 Gb', '480p');
  }
}

export { iPhoneS };