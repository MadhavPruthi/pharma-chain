import * as yup from "yup";
import { Controller, ConvectorController, Invokable, Param } from "@worldsibu/convector-core-controller";

import { Supplier } from "./models/Supplier.model";
import { Manufacturer } from "./models/Manufacturer.model";
import { Distributor } from "./models/Distributor.model";
import { Pharmacist } from "./models/Pharmacist.model";

import { GetById, GetAll, Create, Service } from "@worldsibu/convector-rest-api-decorators";
import { DrugBatch, State } from "./models/drugBatch.model";
import { Drug } from "./models/drug.model";
import { Salt } from "./models/salt.model";

import { SaltBatch } from "./models/saltBatch.model";

@Controller("supplychain")
export class SupplychainController extends ConvectorController {
  /* 
  // Create Instances of Participants 
  */

  @Create("Supplier")
  @Invokable()
  public async createSupplier(
    @Param(Supplier)
    supplier: Supplier
  ) {
    supplier.x509Identity = this.sender;
    supplier.rawMaterialAvailable = [];
    console.log("Executed!!");
    await supplier.save();
  }

  @Create("Manufacturer")
  @Invokable()
  public async createManufacturer(
    @Param(Manufacturer)
    manufacturer: Manufacturer
  ) {
    manufacturer.x509Identity = this.sender;
    await manufacturer.save();
  }

  @Create("Distributor")
  @Invokable()
  public async createDistributor(
    @Param(Distributor)
    distributor: Distributor
  ) {
    distributor.x509Identity = this.sender;
    await distributor.save();
  }

  @Create("Pharmacist")
  @Invokable()
  public async createPharmacist(
    @Param(Pharmacist)
    pharmacist: Pharmacist
  ) {
    pharmacist.x509Identity = this.sender;
    await pharmacist.save();
  }

  /* 
  // Create Salts
  */

  @Create("Salt")
  @Invokable()
  public async createSalt(
    @Param(Salt)
    salt: Salt
  ) {
    await salt.save();
  }

  @Create("SaltBatch")
  @Invokable()
  public async createSaltBatch(
    @Param(SaltBatch)
    saltBatch: SaltBatch
  ) {
    await saltBatch.save();
  }
  /*
  // Get Participants
  */

  @GetAll("Supplier")
  @Invokable()
  public async getAllSuppliers() {
    const storedSuppliers = await Supplier.getAll<Supplier>();
    return storedSuppliers;
  }

  @GetById("Supplier")
  @Invokable()
  public async getSupplierById(
    @Param(yup.string())
    supplierId: string
  ) {
    const supplier = await Supplier.getOne(supplierId);
    return supplier;
  }

  @GetAll("Manufacturer")
  @Invokable()
  public async getAllManufacturers() {
    const storedManufacturers = await Manufacturer.getAll<Manufacturer>();
    return storedManufacturers;
  }

  @GetById("Manufacturer")
  @Invokable()
  public async getManufacturerById(
    @Param(yup.string())
    manufacturerId: string
  ) {
    const manufacturer = await Manufacturer.getOne(manufacturerId);
    return manufacturer;
  }

  @GetAll("Distributor")
  @Invokable()
  public async getAllDistributors() {
    const storedDistributors = await Distributor.getAll<Distributor>();
    return storedDistributors;
  }

  @GetById("Distributor")
  @Invokable()
  public async getDistributorById(
    @Param(yup.string())
    distributorId: string
  ) {
    const distributor = await Distributor.getOne(distributorId);
    return distributor;
  }

  @GetAll("Pharmacist")
  @Invokable()
  public async getAllPharmacists() {
    const storedPharmacists = await Pharmacist.getAll<Pharmacist>();
    return storedPharmacists;
  }
  @GetById("Pharmacist")
  @Invokable()
  public async getPharmacistById(
    @Param(yup.string())
    pharmacistId: string
  ) {
    const pharmacist = await Pharmacist.getOne(pharmacistId);
    return pharmacist;
  }
  @Invokable()
  public async getAllModels() {
    const storedPharmacists = await Pharmacist.getAll<Pharmacist>();
    console.log(storedPharmacists);

    const storedDistributors = await Distributor.getAll<Distributor>();
    console.log(storedDistributors);

    const storedManufacturers = await Manufacturer.getAll<Manufacturer>();
    console.log(storedManufacturers);

    const storedSuppliers = await Supplier.getAll<Supplier>();
    console.log(storedSuppliers);
  }

  /*
  // Transactions
  */

  @Service()
  @Invokable()
  public async fetchSalts(
    @Param(yup.string())
    supplierId: string,
    @Param(yup.object())
    rawMaterialSupply: Map<string, number>
  ) {
    // Get Supplier
    const supplier = await Supplier.getOne(supplierId);

    if (supplier.id && supplier) {
      for (let salt_id of Object.keys(rawMaterialSupply)) {
        let amount = rawMaterialSupply[salt_id];

        const salt = await Salt.getOne(salt_id);

        if (salt.id && salt) {
          let i: number;
          let existBatch: boolean = false;

          for (i = 0; i < supplier.rawMaterialAvailable.length; i++) {
            if (supplier.rawMaterialAvailable[i].salt.name == salt.name) {
              supplier.rawMaterialAvailable[i].amount += amount;
              existBatch = true;
            }
          }

          if (!existBatch) {
            let saltBatch = new SaltBatch();
            saltBatch.id = Math.random()
              .toString(36)
              .substring(7);
            saltBatch.salt = salt;
            saltBatch.amount = amount;
            saltBatch.supplierId = supplier.id;
            saltBatch.saltId = salt.id;
            saltBatch.soldToManufDate = Date.now().toString();
            await saltBatch.save();

            supplier.rawMaterialAvailable.push(saltBatch);
          }
        } else {
          throw new Error("Salt with id: " + salt_id + " doesn't  exist!");
        }
      }
    } else throw new Error("Supplier with id: " + supplierId + " doesn't  exist!");

    await supplier.save();
    return supplier;
  }

  @Service()
  @Invokable()
  public async getRawMaterialFromSupplier(
    @Param(yup.string())
    manufacturerId: string,
    @Param(yup.string())
    supplierId: string,
    @Param(yup.object())
    rawMaterialSupply: Map<string, number>
  ) {
    const supplier = await Supplier.getOne(supplierId);
    const manufacturer = await Manufacturer.getOne(manufacturerId);

    if (supplier.id == null || manufacturer.id == null) {
      throw new Error("Participants does not exist");
    }

    for (let salt_id of Object.keys(rawMaterialSupply)) {
      const salt = await Salt.getOne(salt_id);

      if (salt.id != null) {
        let saltIndexElementFromSupplier = supplier.rawMaterialAvailable.findIndex(saltBatch => {
          return saltBatch.salt.name == salt.name;
        });

        if (saltIndexElementFromSupplier == -1) {
          throw new Error("salt with id: " + salt_id + " doesn't exist in supplier's storage");
        } else {
          let amount = rawMaterialSupply[salt_id];
          let saltElementFromSupplier = supplier.rawMaterialAvailable[saltIndexElementFromSupplier];

          if (amount <= saltElementFromSupplier.amount) {
            let manufSaltBatch = new SaltBatch();
            manufSaltBatch.id = Math.random()
              .toString(36)
              .substring(7);
            manufSaltBatch.amount = amount;
            manufSaltBatch.salt = saltElementFromSupplier.salt;
            manufSaltBatch.saltId = salt_id;
            manufSaltBatch.soldToManufDate = Date.now().toString();
            manufSaltBatch.supplierId = supplier.id;

            supplier.rawMaterialAvailable[saltIndexElementFromSupplier].amount -= amount;
            if (supplier.rawMaterialAvailable[saltIndexElementFromSupplier].amount == 0)
              supplier.rawMaterialAvailable.splice(saltIndexElementFromSupplier, 1);

            await manufSaltBatch.save();

            manufacturer.rawMaterialAvailable.push(manufSaltBatch);
          } else throw new Error("Amount of salt with id: " + salt_id + " not enough in supplier storage!");
        }
      } else {
        throw new Error("salt with id: " + salt_id + " doesn't exist!");
      }
    }

    await supplier.save();
    await manufacturer.save();
    return rawMaterialSupply;
  }

  @Service()
  @Invokable()
  public async manufactureDrugs(
    @Param(yup.string())
    manufacturerId: string,
    @Param(yup.object())
    rawMaterialConsumed: Map<string, number>,
    @Param(yup.string())
    drugName: string,
    @Param(yup.string())
    genericName: string,
    @Param(yup.number())
    productsCreated: number,
    @Param(yup.string())
    expiryDate: string
  ) {
    const manufacturer = await Manufacturer.getOne(manufacturerId);

    let drugBatch = new DrugBatch();
    drugBatch.name = drugName;
    drugBatch.genericName = genericName;
    drugBatch.amount = productsCreated;
    drugBatch.owner = this.sender;
    drugBatch.expiryDate = expiryDate;
    drugBatch.salts = [];
    drugBatch.state = State.DRUG_BATCH_MANUFACTURED;

    for (let salt_id of Object.keys(rawMaterialConsumed)) {
      let rawMaterialSupply = manufacturer.rawMaterialAvailable;
      const index = rawMaterialSupply.findIndex(saltBatch => {
        return saltBatch.saltId == salt_id;
      });

      if (index == -1) {
        throw new Error("Salt with ID: " + salt_id + " doesn't exist in Manufacturer storage");
      } else {
        if (rawMaterialConsumed[salt_id] <= rawMaterialSupply[index].amount) {
          // amount available
          rawMaterialSupply[index].amount -= rawMaterialConsumed[salt_id];
          // add to salts(ingredients) of drug
          drugBatch.salts.push(rawMaterialSupply[index]);
          drugBatch.supplier = await Supplier.getOne(rawMaterialSupply[index].supplierId);

          // TODO: delete elements from manf storage if amount left is 0
        } else {
          throw new Error("Amount of salt " + salt_id + " is not sufficient");
        }
      }
    }
    drugBatch.manufacturer = manufacturer;
    drugBatch.id = Math.random()
      .toString(36)
      .substring(7);
    await drugBatch.save();
    await manufacturer.save();
  }

  // @Service()
  // @Invokable()
  // public async sendProductsToDistribution(
  //   @Param(yup.string())
  //   manufacturerId: string,
  //   @Param(yup.string())
  //   distributorId: string,
  //   @Param(yup.number())
  //   sentProducts: number
  // ) {
  //   const distributor = await Distributor.getOne(distributorId);
  //   distributor.productsToBeShipped = distributor.productsToBeShipped + sentProducts;
  //   const manufacturer = await Manufacturer.getOne(manufacturerId);
  //   manufacturer.productsAvailable = manufacturer.productsAvailable - sentProducts;

  //   await distributor.save();
  //   await manufacturer.save();
  // }

  // @Service()
  // @Invokable()
  // public async orderProductsFromDistributor(
  //   @Param(yup.string())
  //   PharmacistId: string,
  //   @Param(yup.string())
  //   distributorId: string,
  //   @Param(yup.number())
  //   orderedProducts: number
  // ) {
  //   const Pharmacist = await Pharmacist.getOne(PharmacistId);
  //   Pharmacist.productsOrdered = Pharmacist.productsOrdered + orderedProducts;
  //   const distributor = await Distributor.getOne(distributorId);
  //   distributor.productsToBeShipped = distributor.productsToBeShipped - orderedProducts;
  //   distributor.productsShipped = distributor.productsShipped + orderedProducts;

  //   await Pharmacist.save();
  //   await distributor.save();
  // }

  // @Service()
  // @Invokable()
  // public async receiveProductsFromDistributor(
  //   @Param(yup.string())
  //   PharmacistId: string,
  //   @Param(yup.string())
  //   distributorId: string,
  //   @Param(yup.number())
  //   receivedProducts: number
  // ) {
  //   const Pharmacist = await Pharmacist.getOne(PharmacistId);
  //   Pharmacist.productsAvailable = Pharmacist.productsAvailable + receivedProducts;
  //   const distributor = await Distributor.getOne(distributorId);
  //   distributor.productsReceived = distributor.productsReceived + receivedProducts;

  //   await Pharmacist.save();
  //   await distributor.save();
  // }

  // @Service()
  // @Invokable()
  // public async buyProductsFromPharmacist(
  //   @Param(yup.string())
  //   PharmacistId: string,
  //   @Param(yup.string())
  //   customerId: string,
  //   @Param(yup.number())
  //   boughtProducts: number
  // ) {
  //   const Pharmacist = await Pharmacist.getOne(PharmacistId);
  //   Pharmacist.productsAvailable = Pharmacist.productsAvailable - boughtProducts;
  //   Pharmacist.productsSold = Pharmacist.productsSold + boughtProducts;
  //   const customer = await Customer.getOne(customerId);
  //   customer.productsBought = customer.productsBought + boughtProducts;

  //   await Pharmacist.save();
  //   await customer.save();
  // }
}
