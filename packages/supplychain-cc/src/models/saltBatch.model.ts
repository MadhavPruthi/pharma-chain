import * as yup from "yup";
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate,
  FlatConvectorModel
} from "@worldsibu/convector-core-model";
import { Salt } from "./salt.model";
import { Supplier } from "./Supplier.model";

export class SaltBatch extends ConvectorModel<SaltBatch> {
  @ReadOnly()
  @Required()
  public readonly type = "io.pharmachain.SaltBatch";

  @Required()
  @Validate(Salt.schema())
  public salt: FlatConvectorModel<Salt>;

  @Required()
  @Validate(yup.string())
  public saltId: string;

  @Required()
  @Validate(yup.number())
  public amount: number;

  @Required()
  @Validate(yup.string())
  public supplierId: string;

  @Required()
  @Validate(yup.string())
  public soldToManufDate: string;
}
