import exp from "constants";

interface ShippingStrategy {
  calculateShipppingCost(weight: number): number;
}

//普通配送の送料計算
class StandardShipping implements ShippingStrategy {
  calculateShipppingCost(weight: number): number {
    return weight * 5;
  }
}

//速達配送の送料計算
class ExpressShipping implements ShippingStrategy {
  calculateShipppingCost(weight: number): number {
    return weight * 10;
  }
}

class ShippingContext {
  private strategy: ShippingStrategy;

  constructor(strategy: ShippingStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: ShippingStrategy) {
    this.strategy = strategy;
  }

  calculateCost(weight: number): number {
    return this.strategy.calculateShipppingCost(weight);
  }
}

const weight = 5;

const standardShipping = new StandardShipping();
const shippingContext = new ShippingContext(standardShipping);
console.log(`Standar Shipping Cost: $${shippingContext.calculateCost(weight)}`);

const expressShipping = new ExpressShipping();
shippingContext.setStrategy(expressShipping);
console.log(`Express Shipping Cost: $${shippingContext.calculateCost(weight)}`);
