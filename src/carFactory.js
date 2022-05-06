let capitalize = (string) => {
  string = string.toLowerCase();
  return string.charAt(0).toUpperCase() + string.slice(1);
};

let stringifyBrands = (brands) => {
  let brandNames = brands.toString().split(",");
  let stringifiedBrands = "";

  for (let i = 0; i < brandNames.length; i++) {
    if (i === brandNames.length - 1) {
      stringifiedBrands += capitalize(brandNames[i]);
    } else {
      stringifiedBrands += capitalize(brandNames[i]) + ", ";
    }
  }

  return stringifiedBrands;
};

class CarFactory {
  supportedBrands = ["fiat", "lancia", "subaru", "ford"];
  static multipleCarsCreated = 0;

  constructor(name, brands) {
    this.factoryName = `${name} produces: ${stringifyBrands(brands)}`;

    if (Array.isArray(brands)) {
      this.brandsSupportedByFactory = brands;
    } else {
      this.brandsSupportedByFactory = [brands];
    }
    this.checkIfBrandIsSupported(brands);
  }

  checkIfBrandIsSupported = (brand) => {
    let doesSupportBrand = false;
    let brandNames = brand.toString().toLowerCase().split(",");

    for (let i = 0; i < brandNames.length; i++) {
      if (this.supportedBrands.includes(brandNames[i])) {
        doesSupportBrand = true;
      } else {
        doesSupportBrand = false;
        break;
      }
    }

    if (!doesSupportBrand) {
      let stringifiedBrands = stringifyBrands(brand);

      this.stringifiedBrands = stringifiedBrands;

      throw new UnsupportedBrandError(
        `Brand not supported: '${stringifiedBrands}'`
      );
    }
  };

  *createCars(...amount) {
    if (amount.length === 1 && typeof amount[0] === "number") {
      for (let i = 0; i < amount[0]; i++) {
        yield this.createCar(
          this.brandsSupportedByFactory[
            CarFactory.multipleCarsCreated %
              this.brandsSupportedByFactory.length
          ]
        );
        CarFactory.multipleCarsCreated++;
      }
    } else {
      for (let i = 0; i < amount.length; i++) {
        for (let j = 0; j < amount[i][0]; j++) {
          yield this.createCar(amount[i][1]);
        }
      }
    }
  }

  createCar(brand) {
    if (brand == undefined) {
      if (this.brandsSupportedByFactory.length > 1) {
        throw new UnsupportedBrandError(
          "Factory does not have a brand or do not support it"
        );
      } else {
        return {
          brand: "Fiat",
        };
      }
    } else {
      if (!this.brandsSupportedByFactory.includes(brand)) {
        throw new UnsupportedBrandError(
          "Factory does not have a brand or do not support it"
        );
      } else {
        return {
          brand: capitalize(brand),
        };
      }
    }
  }
}

class UnsupportedBrandError extends Error {}

module.exports = { CarFactory, UnsupportedBrandError };
