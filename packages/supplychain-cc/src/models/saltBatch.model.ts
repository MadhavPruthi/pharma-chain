import * as yup from 'yup';
import {
    ConvectorModel,
    Default,
    ReadOnly,
    Required,
    Validate,
    FlatConvectorModel
} from '@worldsibu/convector-core-model'
import { Salt } from './salt.model';

export class SaltBatch extends ConvectorModel<SaltBatch> {

    @ReadOnly()
    @Required()
    public readonly type = 'io.pharmachain.SaltBatch';

    @Required()
    @Validate(yup.string())
    public salt: FlatConvectorModel<Salt>;

    @Required()
    @Validate(yup.number())
    public amount: number;

}