function syncFunction1 (){
  console.log(1);
}

function asyncFunction2() {
  setTimeout(function () {
    // aTimeConsumingProcess();
    console.log('async: ' + 2);  
  },0);
}

function syncFunction2 (){
  console.log(2);
}

function syncFunction3 (){
  console.log(3);
}

// eventloop / taskqueue

syncFunction1();
asyncFunction2();
syncFunction2();
syncFunction3();