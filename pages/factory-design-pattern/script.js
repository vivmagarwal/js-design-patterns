console.log('factory-design-pattern works!!');

// ===================================================== //
// Example - iPhone Factory [extremely generic]
class Phone {
  constructor(serialNum, model='Generic', RAM='2 Gb', camera='720p') {
    this.serialNum = serialNum;
    this.configuration = {
      model, 
      RAM,
      camera
    }
  }

  dial(num) {
    console.log(`Dialing ${num}.. from my ${this.configuration.model}`);
  }

  displayConfig() {
    console.log(this.serialNum, this.configuration);
  }
}

// Usage:
const iPhone_xr = new Phone('IPXR-001', 'iPhone Xr', '3 Gb', '1080p');
// iPhone_xr.displayConfig();
// iPhone_xr.dial(123412341234);

// ===================================================== //
// Example - iPhone XR, XS & S Factory [a bit specific]
class iPhoneXRFactory {
  constructor(serialNum) {
    return new Phone(serialNum, 'iPhone Xr', '3 Gb', '1080p');
  }
}

class iPhoneXSFactory {
  constructor(serialNum) {
    return new Phone(serialNum, 'iPhone Xs', '2 Gb', '720p');
  }
}

class iPhoneSFactory {
  constructor(serialNum) {
    return new Phone(serialNum, 'iPhone S', '1 Gb', '480p');
  }
}

// Usage: 
const iPhoneXr2 = new iPhoneXRFactory('IPXR-002');

// iPhoneXr2.displayConfig();
// iPhoneXr2.dial(12341234);

const iPhoneXr3 = new iPhoneXRFactory('IPXR-003');
// iPhoneXr3.displayConfig();
// iPhoneXr3.dial(12341234);

// ===================================================== //
// Example - Abstract factory

class iPhoneAbstractFactory {
  create(type, serialNum) {
    switch (type) {
      case 's':
        return new iPhoneSFactory(serialNum);
      case 'xs':
        return new iPhoneXSFactory(serialNum);
      case 'xr':
        return new iPhoneXRFactory(serialNum);
      default: 
        console.log('Unknown type...');
    }
  }
}

// Usage:
const iPhoneAbstractFactorySingleton = new iPhoneAbstractFactory;

const iPhoneXr4 = iPhoneAbstractFactorySingleton.create('xr', 'IPXR-004');
const iPhoneXs1 = iPhoneAbstractFactorySingleton.create('xs', 'IPXS-001');
const iPhoneS1 = iPhoneAbstractFactorySingleton.create('s', 'IPS-001');

// iPhoneXr4.displayConfig();
// iPhoneXs1.displayConfig();
// iPhoneS1.displayConfig();
// iPhoneS1.dial(98769876);

// ===================================================== //

