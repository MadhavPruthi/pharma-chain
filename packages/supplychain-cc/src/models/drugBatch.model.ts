import * as yup from "yup";
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate,
  FlatConvectorModel
} from "@worldsibu/convector-core-model";

import { Supplier } from "./Supplier.model";
import { Manufacturer } from "./Manufacturer.model";
import { Distributor } from "./Distributor.model";
import { Pharmacist } from "./Pharmacist.model";
import { SaltBatch } from "./saltBatch.model";

export enum State {
  DRUG_BATCH_MANUFACTURED,
  DRUG_BATCH_SHIPPED,
  IN_DISTRIBUTOR_STORAGE,
  RECEIVED_BY_PHARMACIST,
  READY_FOR_SALE
}

export class DrugBatch extends ConvectorModel<DrugBatch> {
  @ReadOnly()
  @Required()
  public readonly type = "io.pharmachain.drugBatch";

  @Required()
  @Validate(yup.string())
  public name: string;

  @Required()
  public state: State;

  @Required()
  @Validate(yup.number())
  public amount: number;

  @Default([])
  @Validate(yup.array(SaltBatch.schema()))
  public salts: Array<FlatConvectorModel<SaltBatch>>;

  @Required()
  @Validate(yup.string())
  public genericName: string;

  @Required()
  @Validate(yup.string())
  public owner: string;

  @Required()
  @Validate(yup.string())
  public expiryDate: string;

  @Required()
  @Validate(yup.string())
  public manufacturingDate: string;

  @Validate(yup.string())
  public shippingId: string;

  @Validate(yup.string())
  public dateShippedFromManufacturer: string;

  @Validate(yup.string())
  public dateReceivedByDistributor: string;

  @Validate(yup.string())
  public dateReceivedByPharmacist: string;

  @Required()
  @ReadOnly()
  @Validate(Supplier)
  public supplier: FlatConvectorModel<Supplier>;

  @Required()
  @ReadOnly()
  @Validate(Manufacturer)
  public manufacturer: FlatConvectorModel<Manufacturer>;

  @Validate(Distributor)
  public distributor: FlatConvectorModel<Distributor>;

  @Validate(Pharmacist)
  public pharmacist: FlatConvectorModel<Pharmacist>;
}
