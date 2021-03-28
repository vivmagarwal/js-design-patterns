console.log('javascript-tricks works!!');

// ===================================================== //
// string as function body 
// ===================================================== //

const func = new Function(`
  let name = 'John Doe';
  console.log(name);
`);

func();