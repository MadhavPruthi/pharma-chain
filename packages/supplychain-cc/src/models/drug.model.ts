import * as yup from "yup";
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate,
  FlatConvectorModel,
} from "@worldsibu/convector-core-model";
import { DrugBatch } from "./drugBatch.model";

export class Drug extends ConvectorModel<Drug> {
  @ReadOnly()
  @Required()
  public readonly type = "io.pharmachain.drug";

  @Required()
  @Validate(yup.string())
  public name: string;

  @Required()
  @Validate(DrugBatch)
  public batch: FlatConvectorModel<DrugBatch>;

  @Required()
  @Validate(yup.date())
  public dateSold: Date;

  @Required()
  @Validate(yup.number())
  public amount: number;

  @Required()
  @Validate(yup.string())
  public invoiceNumber: string;

  @Validate(yup.string())
  public customerID: string;
}
