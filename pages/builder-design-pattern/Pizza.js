function Pizza() {
  this.pizza = {};
  this.setBase = (base) => this.pizza.base = base;
  this.setSauce = (sauce) => this.pizza.sauce = sauce;
  this.setCheeze = (cheeze) => this.pizza.cheeze = cheeze;
  this.setToppings = (toppings) => this.pizza.toppings = toppings;
  this.bake = () => console.log(this.pizza);
}

export { Pizza };