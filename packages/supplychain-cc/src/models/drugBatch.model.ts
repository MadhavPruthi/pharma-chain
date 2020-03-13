import * as yup from 'yup';
import {
    ConvectorModel,
    Default,
    ReadOnly,
    Required,
    Validate,
    FlatConvectorModel
} from '@worldsibu/convector-core-model';

import {Salt} from './salt.model'
import { Supplier } from './Supplier.model';
import { Manufacturer } from './Manufacturer.model';
import { Distributor } from './Distributor.model';
import { Pharmacist } from './Pharmacist.model';

enum State {
    SALTS_SHIPPED,
    SALTS_RECEIVED,
    DRUG_BATCH_MANUFACTURED,
    SENT_TO_DISTRIBUTORS,
    READY_FOR_DISTRIBUTION,
    IMPORTED,
    READY_FOR_SALE
  };


export class DrugBatch extends ConvectorModel<DrugBatch> {

    @ReadOnly()
    @Required()
    public readonly type = 'io.pharmachain.drugBatch';


    @Required()
    @Validate(yup.string())
    public name: string;

    @Required()
    public state: State;

    @Required()
    @Validate(yup.number())
    public amount: number;

    @Default([])
    public salts: Array<FlatConvectorModel<Salt>>

    @Required()
    @Validate(yup.string())
    public genericName:string;

    @Required()
    @Validate(yup.string())
    public owner: string;

    @Required()
    @Validate(yup.date())
    public expiryDate:Date;

    @Required()
    @Validate(yup.date())
    public manufacturingDate:Date;

    @Validate(yup.date())
    public dateShippedFromManufacturer:Date;

    @Required()
    @Validate(yup.date())
    public saltsReceived: Date;

    @Validate(yup.date())
    public dateReceivedByDistributor:Date;

    @Validate(yup.date())
    public dateShippedFromDistributor: Date;

    @Validate(yup.date())
    public dateReceivedByPharmacist:Date;

    @Required()
    @ReadOnly()
    public supplier: FlatConvectorModel<Supplier>;

    @Required()
    @ReadOnly()
    public manufacturer: FlatConvectorModel<Manufacturer>;

    public distributor: FlatConvectorModel<Distributor>;

    public pharmacist: FlatConvectorModel<Pharmacist>;
}