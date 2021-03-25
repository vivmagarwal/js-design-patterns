console.log('javascript-tricks works!!');

let func = new Function(`
  let a = 55;
  console.log(a);
`);

func();