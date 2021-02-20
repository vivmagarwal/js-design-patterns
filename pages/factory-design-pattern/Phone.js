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

export { Phone };