import * as yup from "yup";
import { ConvectorModel, Default, ReadOnly, Required, Validate } from "@worldsibu/convector-core-model";

export class Pharmacist extends ConvectorModel<Pharmacist> {
  @ReadOnly()
  @Required()
  public readonly type: string = "io.pharmachain.Pharmacist";

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

  @Required()
  @Validate(yup.number())
  public drugBatchsAvailable: number = 0;

  @Required()
  @Validate(yup.number())
  public drugsSold: number = 0;
}
