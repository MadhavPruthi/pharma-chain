import * as yup from "yup";
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate,
  FlatConvectorModel,
} from "@worldsibu/convector-core-model";
import { SaltBatch } from "./saltBatch.model";

export class Supplier extends ConvectorModel<Supplier> {
  @ReadOnly()
  @Required()
  public readonly type: string = "io.pharmachain.Supplier";

  @Validate(yup.string())
  public x509Identity: string;

  @ReadOnly()
  @Validate(yup.string())
  public msp: string;

  @Required()
  @Validate(yup.string())
  public address: string;

  @Required()
  @Validate(yup.string())
  public organizationName: string;

  @Required()
  @Validate(yup.string())
  public authorityNumber: string;

  @Validate(yup.array(SaltBatch.schema()))
  @Required()
  public rawMaterialAvailable: Array<FlatConvectorModel<SaltBatch>>;
}
