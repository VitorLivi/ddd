import { Sequelize } from "sequelize-typescript";
import { ProductRepository } from './product.repository';
import { ProductModel } from "./product.model";
import { Product } from "../../../../domain/product/entity/product";

describe("Product repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
      models: [ProductModel],
    });

    await sequelize.sync();
  });


  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    productRepository.create(product);
    const productModel = await ProductModel.findOne({ where: { id: "1" } });

    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 100
    });
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    productRepository.create(product);
    product.changeName("Product 1 updated");
    product.changePrice(200);
    productRepository.update(product);
    const productModel = await ProductModel.findOne({ where: { id: "1" } });

    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1 updated",
      price: 200
    });
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    productRepository.create(product);
    const productFound = await productRepository.find("1");

    expect(productFound).toEqual(product);
  });

  it("should find all products", async () => {
    const productRepository = new ProductRepository();
    const product1 = new Product("1", "Product 1", 100);
    const product2 = new Product("2", "Product 2", 200);

    productRepository.create(product1);
    productRepository.create(product2);
    const productsFound = await productRepository.findAll();

    expect(productsFound).toEqual([
      product1,
      product2
    ]);
  });
});