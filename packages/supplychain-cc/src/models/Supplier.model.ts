import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate,
  FlatConvectorModel
} from '@worldsibu/convector-core-model';
import { Salt } from './salt.model';

export class Supplier extends ConvectorModel<Supplier> {
  @ReadOnly()
  @Required()
  public readonly type:string = 'io.pharmachain.Supplier';

  @Validate(yup.string())
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
  public rawMaterialAvailable: Map<string,number> = new Map<string,number>();

}