import { Product } from "../entity/product";
import { ProductB } from "../entity/product-b";
import ProductFactory from "./product.factory";

describe("Product factory unit test", () => {
  it("should create a product type a", () => {
    const product = ProductFactory.create("a", "Product A", 1);

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product A");
    expect(product.price).toBe(1);
    expect(product).toBeInstanceOf(Product);
  });

  it("should create a product type b", () => {
    const product = ProductFactory.create("b", "Product B", 2);

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product B");
    expect(product.price).toBe(4);
    expect(product).toBeInstanceOf(ProductB);
  });

  it("should throw an error when type is invalid", () => {
    expect(() => ProductFactory.create("c", "Product C", 3)).toThrow(
      "Invalid product type"
    );
  });
});