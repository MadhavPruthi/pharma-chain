import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';

export class Pharmacist extends ConvectorModel<Pharmacist> {
  @ReadOnly()
  @Required()
  public readonly type:string = 'io.pharmachain.Pharmacist';

  public x509Identity: string;

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
  public drugsOrdered: number = 0;

  @Required()
  @Validate(yup.number())
  public drugsAvailable: number = 0;

  @Required()
  @Validate(yup.number())
  public drugsSold: number = 0;
}