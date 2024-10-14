"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//普通配送の送料計算
var StandardShipping = /** @class */ (function () {
    function StandardShipping() {
    }
    StandardShipping.prototype.calculateShipppingCost = function (weight) {
        return weight * 5;
    };
    return StandardShipping;
}());
//速達配送の送料計算
var ExpressShipping = /** @class */ (function () {
    function ExpressShipping() {
    }
    ExpressShipping.prototype.calculateShipppingCost = function (weight) {
        return weight * 10;
    };
    return ExpressShipping;
}());
var ShippingContext = /** @class */ (function () {
    function ShippingContext(strategy) {
        this.strategy = strategy;
    }
    ShippingContext.prototype.setStrategy = function (strategy) {
        this.strategy = strategy;
    };
    ShippingContext.prototype.calculateCost = function (weight) {
        return this.strategy.calculateShipppingCost(weight);
    };
    return ShippingContext;
}());
var weight = 5;
var standardShipping = new StandardShipping();
var shippingContext = new ShippingContext(standardShipping);
console.log("Standar Shipping Cost: $".concat(shippingContext.calculateCost(weight)));
var expressShipping = new ExpressShipping();
shippingContext.setStrategy(expressShipping);
console.log("Express Shipping Cost: $".concat(shippingContext.calculateCost(weight)));
