import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';

export class Distributor extends ConvectorModel<Distributor> {
  @ReadOnly()
  @Required()
  public readonly type:string = 'io.pharmachain.Distributor';

  @Validate(yup.string())
  public x509Identity: string;

  @Required()
  @Validate(yup.string())
  public organizationName: string;

  @Required()
  @Validate(yup.string())
  public address: string;

  @Required()
  @Validate(yup.number())
  public batchToBeShipped: number = 0;

  @Required()
  @Validate(yup.number())
  public batchShipped: number = 0;

  @Required()
  @Validate(yup.number())
  public batchReceived: number = 0;
}