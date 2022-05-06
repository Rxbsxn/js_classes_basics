class Car {
  static COLORS = ["Pink", "Purple", "Magenta"];
  static instancesCount = 0;

  constructor(brand,color = Car.COLORS[Car.instancesCount % Car.COLORS.length]) {
    this.brand = brand;
    this.color = color;
    ++Car.instancesCount;
  }
}

module.exports = Car;
