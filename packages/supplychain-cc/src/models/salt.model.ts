import * as yup from 'yup';
import {
    ConvectorModel,
    Default,
    ReadOnly,
    Required,
    Validate
} from '@worldsibu/convector-core-model'

export class Salt extends ConvectorModel<Salt> {

    @ReadOnly()
    @Required()
    public readonly type = 'io.pharmachain.salt';

    @Required()
    @Validate(yup.string())
    public name: string;


}