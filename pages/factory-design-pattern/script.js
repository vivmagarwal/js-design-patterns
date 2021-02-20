console.log('factory-design-pattern works!!');

// Example 1 - iPhone Factory [extremely generic]

import { Phone } from './Phone.js';

const iPhoneXR = new Phone('IPXR-001', 'iPhone Xr', '3 Gb', '1080p');
iPhoneXR.displayConfig();
iPhoneXR.dial(123412341234);

// Example 2 - iPhone XR Factory [a bit specific]

import { iPhoneXR as iPhoneXRFactory } from "./iPhoneXR.js";

const iPhoneXr2 = new iPhoneXRFactory('IPXR-002');
iPhoneXr2.displayConfig();
iPhoneXr2.dial(12341234);

const iPhoneXr3 = new iPhoneXRFactory('IPXR-003');
iPhoneXr3.displayConfig();
iPhoneXr3.dial(12341234);

// Example 3 - Abstract factory

import { iPhoneAbstractFactory } from './iPhoneAbstractFactory.js';

const iPhoneXr4 = iPhoneAbstractFactory.create('xr', 'IPXR-004');
const iPhoneXs1 = iPhoneAbstractFactory.create('xs', 'IPXS-001');
const iPhoneS1 = iPhoneAbstractFactory.create('s', 'IPS-001');

iPhoneXr4.displayConfig();
iPhoneXs1.displayConfig();
iPhoneS1.displayConfig();
iPhoneS1.dial(98769876);
