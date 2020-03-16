import * as yup from 'yup';
import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core-controller';

import { Supplier } from './models/Supplier.model';
import { Manufacturer } from './models/Manufacturer.model';
import { Distributor } from './models/Distributor.model';
import { Pharmacist } from './models/Pharmacist.model';

import { GetById, GetAll, Create, Service } from '@worldsibu/convector-rest-api-decorators';
import { DrugBatch } from './models/drugBatch.model';
import { Drug } from './models/drug.model';
import { Salt } from './models/salt.model';

import {
  FlatConvectorModel
} from '@worldsibu/convector-core-model';

@Controller('supplychain')
export class SupplychainController extends ConvectorController {

  /* 
  // Create Instances of Participants 
  */

  @Create('Supplier')
  @Invokable()
  public async createSupplier(
    @Param(Supplier)
    supplier: Supplier
  ) {
    supplier.x509Identity = this.sender;
    console.log("Executed!!");
    await supplier.save();
  }

  @Create('Manufacturer')
  @Invokable()
  public async createManufacturer(
    @Param(Manufacturer)
    manufacturer: Manufacturer
  ) {
    manufacturer.x509Identity = this.sender;
    await manufacturer.save();
  }

  @Create('Distributor')
  @Invokable()
  public async createDistributor(
    @Param(Distributor)
    distributor: Distributor
  ) {
    distributor.x509Identity = this.sender;
    await distributor.save();
  }

  @Create('Pharmacist')
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

  @Create('Salt')
  @Invokable()
  public async createSalt(
    @Param(Salt)
    salt: Salt
  ){
      await salt.save();
  }
  /*
  // Get Participants
  */

  @GetAll('Supplier')
  @Invokable()
  public async getAllSuppliers()
  {
    const storedSuppliers = await Supplier.getAll<Supplier>();
    return storedSuppliers;
  }

  @GetById('Supplier')
  @Invokable()
  public async getSupplierById(
    @Param(yup.string())
    supplierId: string
  )
  {
    const supplier = await Supplier.getOne(supplierId);
    return supplier;
  }

  @GetAll('Manufacturer')
  @Invokable()
  public async getAllManufacturers()
  {
    const storedManufacturers = await Manufacturer.getAll<Manufacturer>();
    return storedManufacturers;
  }

  @GetById('Manufacturer')
  @Invokable()
  public async getManufacturerById(
    @Param(yup.string())
    manufacturerId: string
  )
  {
    const manufacturer = await Manufacturer.getOne(manufacturerId);
    return manufacturer;
  }

  @GetAll('Distributor')
  @Invokable()
  public async getAllDistributors()
  {
    const storedDistributors = await Distributor.getAll<Distributor>();
    return storedDistributors
  }

  @GetById('Distributor')
  @Invokable()
  public async getDistributorById(
    @Param(yup.string())
    distributorId: string
  )
  {
    const distributor = await Distributor.getOne(distributorId);
    return distributor;
  }

  @GetAll('Pharmacist')
  @Invokable()
  public async getAllPharmacists()
  {
    const storedPharmacists = await Pharmacist.getAll<Pharmacist>();
    return storedPharmacists;
  }
  @GetById('Pharmacist')
  @Invokable()
  public async getPharmacistById(
    @Param(yup.string())
    pharmacistId: string
  )
  {
    const pharmacist = await Pharmacist.getOne(pharmacistId);
    return pharmacist;
  }
  @Invokable()
  public async getAllModels()
  {
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
    rawMaterialSupply: Map<string,number>
  ) {

    // Get Supplier
    const supplier = await Supplier.getOne(supplierId);

    if(supplier.id && supplier)
    {
    
      for(let salt_id of rawMaterialSupply.keys())
      {
        const amount = rawMaterialSupply[salt_id];

        const salt = await Salt.getOne(salt_id);

        if(salt.id && salt){
          supplier.rawMaterialAvailable.set(salt_id,amount);
          salt.owner = supplier.x509Identity;
        }
        else{
          throw new Error("Salt with id: " + salt_id + " doesn't  exist!");
        }
      }
    }
    else
      throw new Error("Supplier with id: " + supplierId + " doesn't  exist!");

    await supplier.save();
    return supplier.toJSON();
  }

  @Service()
  @Invokable()
  public async getRawMaterialFromSupplier(
    @Param(yup.string())
    manufacturerId: string,
    @Param(yup.string())
    supplierId: string,
    @Param(yup.mixed())
    rawMaterialSupply: Map<string,number>
  ) {
    const supplier = await Supplier.getOne(supplierId);
    const manufacturer = await Manufacturer.getOne(manufacturerId);

    await supplier.save();
    await manufacturer.save();
  }

  // @Service()
  // @Invokable()
  // public async createProducts(
  //   @Param(yup.string())
  //   manufacturerId: string,
  //   @Param(yup.number())
  //   rawMaterialConsumed: number,
  //   @Param(yup.number())
  //   productsCreated: number
  // ) {
  //   const manufacturer = await Manufacturer.getOne(manufacturerId);
  //   manufacturer.rawMaterialAvailable = manufacturer.rawMaterialAvailable - rawMaterialConsumed;
  //   manufacturer.productsAvailable = manufacturer.productsAvailable + productsCreated;
  //   await manufacturer.save();
  // }

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
