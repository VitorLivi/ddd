
import { Product } from './product';

describe("Product unit tests", () => {
  it("should throw an error when id is empty", () => {
    expect(() => new Product("", "Product 1", 100)).toThrowError("Invalid length for id");
  });

  it("should throw an error when name is empty", () => {
    expect(() => new Product("123", "", 100)).toThrowError("Invalid length for name");
  });

  it("should throw an error when price is less than zero", () => {
    expect(() => new Product("123", "Name", -1)).toThrowError("Invalid price");
  });

  it("should change name", () => {
    const product = new Product("123", "Name", 100);
    product.changeName("New name");
    expect(product.name).toBe("New name");
  });

  it("should change price", () => {
    const product = new Product("123", "Name", 100);
    product.changePrice(150);
    expect(product.price).toBe(150);
  });
});
