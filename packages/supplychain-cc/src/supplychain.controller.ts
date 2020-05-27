import * as yup from "yup";
import { Controller, ConvectorController, Invokable, Param } from "@worldsibu/convector-core-controller";

import { Supplier } from "./models/Supplier.model";
import { Manufacturer } from "./models/Manufacturer.model";
import { Distributor } from "./models/Distributor.model";
import { Pharmacist } from "./models/Pharmacist.model";
import { ChaincodeTx } from "@worldsibu/convector-core-chaincode";

import { GetById, GetAll, Create, Service } from "@worldsibu/convector-rest-api-decorators";
import { DrugBatch, State } from "./models/drugBatch.model";
import { Drug } from "./models/drug.model";
import { Salt } from "./models/salt.model";

import { SaltBatch } from "./models/saltBatch.model";

@Controller("supplychain")
export class SupplychainController extends ConvectorController<ChaincodeTx> {
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
    supplier.msp = this.tx.identity.getMSPID();
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
    manufacturer.msp = this.tx.identity.getMSPID();
    await manufacturer.save();
  }

  @Create("Distributor")
  @Invokable()
  public async createDistributor(
    @Param(Distributor)
    distributor: Distributor
  ) {
    distributor.x509Identity = this.sender;
    distributor.msp = this.tx.identity.getMSPID();
    await distributor.save();
  }

  @Create("Pharmacist")
  @Invokable()
  public async createPharmacist(
    @Param(Pharmacist)
    pharmacist: Pharmacist
  ) {
    pharmacist.x509Identity = this.sender;
    pharmacist.msp = this.tx.identity.getMSPID();
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

  // @Invokable()
  // public async getSaltBatchBySupplier(
  //   @Param(yup.string())
  //   supplierId: string
  // ) {
  //   const supplier = await Supplier.getOne(supplierId);
  //   if (!supplier && !supplier.id) {
  //     throw new Error("Supplier with id: " + supplierId + " doesn't  exist!");
  //   }
  //   const saltBatchArray = await SaltBatch.query(SaltBatch, {
  //     selector: {
  //       supplier: {
  //         id: supplierId,
  //       },
  //     },
  //   });
  //   return saltBatchArray;
  // }

  // @Invokable()
  // public async getSaltBatchByManufacturer(
  //   @Param(yup.string())
  //   manufacturerId: string
  // ) {
  //   const manufacturer = await Supplier.getOne(manufacturerId);
  //   if (!manufacturer && !manufacturer.id) {
  //     throw new Error("Supplier with id: " + manufacturerId + " doesn't  exist!");
  //   }
  //   const saltBatchArray = await SaltBatch.query(SaltBatch, {
  //     selector: {
  //       manufacturer: {
  //         id: manufacturerId,
  //       },
  //     },
  //   });
  //   return saltBatchArray;
  // }

  @Invokable()
  public async getDrugBatchByParticipant(
    @Param(yup.string())
    id: string,
    @Param(yup.string())
    type: string
  ) {
    if (type == "manufacturer") {
      const manufacturer = await Manufacturer.getOne(id);
      if (!manufacturer && !manufacturer.id) {
        throw new Error("Manufacturer with id: " + id + " doesn't  exist!");
      }
      const drugBatchArray = await DrugBatch.query(DrugBatch, {
        selector: {
          manufacturer: {
            id: id,
          },
        },
      });
      return drugBatchArray;
    }

    if (type == "distributor") {
      const distributor = await Distributor.getOne(id);
      if (!distributor && !distributor.id) {
        throw new Error("distributor with id: " + id + " doesn't  exist!");
      }
      const drugBatchArray = await DrugBatch.query(DrugBatch, {
        selector: {
          distributor: {
            id: id,
          },
        },
      });
      return drugBatchArray;
    }

    if (type == "pharmacist") {
      const pharmacist = await Pharmacist.getOne(id);
      if (!pharmacist && !pharmacist.id) {
        throw new Error("pharmacist with id: " + id + " doesn't  exist!");
      }
      const drugBatchArray = await DrugBatch.query(DrugBatch, {
        selector: {
          pharmacist: {
            id: id,
          },
        },
      });
      return drugBatchArray;
    }

    throw new Error("Type is not correct");
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

  /* get Salt Drug Info */

  @GetAll("DrugBatch")
  @Invokable()
  public async getAllDrugBatchs() {
    const storedDrugBatchs = await DrugBatch.getAll<DrugBatch>();
    return storedDrugBatchs;
  }

  @GetAll("SaltBatch")
  @Invokable()
  public async getAllSaltBatchs() {
    const storedSaltBatchs = await SaltBatch.getAll<SaltBatch>();
    return storedSaltBatchs;
  }

  @GetById("DrugBatch")
  @Invokable()
  public async getDrugBatchHistory(
    @Param(yup.string())
    drugBatchId: string
  ) {
    const drugBatch = await DrugBatch.getOne(drugBatchId);
    return drugBatch.history();
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
            saltBatch.id = Math.random().toString(36).substring(7);
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
        let saltIndexElementFromSupplier = supplier.rawMaterialAvailable.findIndex((saltBatch) => {
          return saltBatch.salt.name == salt.name;
        });

        if (saltIndexElementFromSupplier == -1) {
          throw new Error("salt with id: " + salt_id + " doesn't exist in supplier's storage");
        } else {
          let amount = rawMaterialSupply[salt_id];
          let saltElementFromSupplier = supplier.rawMaterialAvailable[saltIndexElementFromSupplier];

          if (amount <= saltElementFromSupplier.amount) {
            let manufSaltBatch = new SaltBatch();
            manufSaltBatch.id = Math.random().toString(36).substring(7);
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
      const index = rawMaterialSupply.findIndex((saltBatch) => {
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
    drugBatch.manufacturingDate = this.tx.stub.getTxDate().toDateString();
    drugBatch.id = Math.random().toString(36).substring(7);
    await drugBatch.save();
    await manufacturer.save();
  }

  @Service()
  @Invokable()
  public async shipProductsFromManufacturerToDistributor(
    @Param(yup.string())
    manufacturerId: string,
    @Param(yup.string())
    distributorId: string,
    @Param(yup.string())
    drugName: string,
    @Param(yup.string())
    shippingID: string
  ) {
    const distributor = await Distributor.getOne(distributorId);
    const manufacturer = await Manufacturer.getOne(manufacturerId);

    if (distributor.id == null || manufacturer.id == null) {
      throw new Error("Participants doesn't exist");
    }

    const drugBatchArray = await DrugBatch.query(DrugBatch, {
      selector: {
        name: drugName,
        manufacturer: {
          id: manufacturerId,
        },
        state: State.DRUG_BATCH_MANUFACTURED,
      },
    });

    if (drugBatchArray[0] == undefined) {
      return {
        message: "No drug batch is available yet!",
      };
    }

    const drugBatch: DrugBatch = drugBatchArray[0];
    await drugBatch.update({
      state: State.DRUG_BATCH_SHIPPED,
      shippingId: shippingID,
      distributor: distributor,
      dateShippedFromManufacturer: this.tx.stub.getTxDate().toString(),
    });

    await distributor.save();
    await manufacturer.save();

    return drugBatch;
  }

  @Service()
  @Invokable()
  public async receiveProductsFromManufacturerByDistributor(
    @Param(yup.string())
    distributorId: string,
    @Param(yup.string())
    shippingID: string
  ) {
    const distributor = await Distributor.getOne(distributorId);

    if (distributor.id == null) {
      throw new Error("Participants doesn't exist");
    }

    const drugBatchArray = await DrugBatch.query(DrugBatch, {
      selector: {
        shippingId: shippingID,
        state: State.DRUG_BATCH_SHIPPED,
      },
    });

    if (drugBatchArray[0] == undefined) {
      return {
        message: "No drug batch is shipped with id: " + shippingID + " yet!",
      };
    }

    const drugBatch: DrugBatch = drugBatchArray[0];
    await drugBatch.update({
      state: State.IN_DISTRIBUTOR_STORAGE,
      dateReceivedByDistributor: this.tx.stub.getTxDate().toString(),
    });

    await distributor.save();

    return drugBatchArray;
  }

  @Service()
  @Invokable()
  public async exportProductsToPharmacist(
    @Param(yup.string())
    pharmacistID: string,
    @Param(yup.string())
    distributorId: string,
    @Param(yup.string())
    batchId: string
  ) {
    const distributor = await Distributor.getOne(distributorId);

    if (distributor.id == null) {
      throw new Error("Diistributor with id: " + distributorId + " doesn't exist");
    }

    let pharmacist = await Pharmacist.getOne(pharmacistID);

    // id: batchId,
    let drugBatchArray = await DrugBatch.query(DrugBatch, {
      selector: {
        distributor: {
          id: distributorId,
        },
        state: State.IN_DISTRIBUTOR_STORAGE,
      },
    });

    let drugBatch: DrugBatch = drugBatchArray[0];
    if (drugBatch == undefined) {
      throw new Error("No Batch exist with given paramters");
    }

    await drugBatch.update({
      pharmacist: pharmacist,
      state: State.RECEIVED_BY_PHARMACIST,
      dateReceivedByPharmacist: this.tx.stub.getTxDate().toDateString(),
      owner: this.sender,
    });

    await pharmacist.update({
      drugBatchsAvailable: pharmacist.drugBatchsAvailable + 1,
    });
  }

  @Service()
  @Invokable()
  public async buyProductsFromPharmacist(
    @Param(yup.string())
    pharmacistId: string,
    @Param(yup.string())
    drugName: string,
    @Param(yup.number())
    boughtProducts: number,
    @Param(yup.string())
    customerID: string,
    @Param(yup.string())
    invoiceNumber: string
  ) {
    const pharmacist = await Pharmacist.getOne(pharmacistId);
    if (pharmacist.id == null) {
      throw new Error("Diistributor with id: " + pharmacistId + " doesn't exist");
    }

    // Todo: selling medicines from multiple batches

    let drugBatchArrayFetch = await DrugBatch.query(DrugBatch, {
      selector: {
        name: drugName,
        amount: { $gt: boughtProducts },
        pharmacist: {
          id: pharmacistId,
        },
      },
    });

    let drugBatchArray: DrugBatch[] = drugBatchArrayFetch as any;
    drugBatchArray.sort((A, B) => {
      if (A.amount >= B.amount) return 1;

      return -1;
    });

    let drugBatch: DrugBatch = drugBatchArray[0];
    if (drugBatch == undefined) {
      throw new Error("Required Amount not present in storage!");
    }

    await drugBatch.update({
      amount: drugBatch.amount - boughtProducts,
    });

    let drug = new Drug();
    drug.id = Math.random().toString(36).substring(7);

    drug.name = drugName;
    drug.batch = drugBatch;
    drug.amount = boughtProducts;
    drug.dateSold = this.tx.stub.getTxDate();
    drug.invoiceNumber = invoiceNumber;
    drug.customerID = customerID;

    await drug.save();
    return drug;
  }
}
