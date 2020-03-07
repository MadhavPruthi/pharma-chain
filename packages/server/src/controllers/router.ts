import * as express from 'express';
import { 
    SupplychainController_createSupplier_post,
    SupplychainController_getAllCustomers_get } from './controllers'
export default express.Router()
.post('/supplychain/createSupplier', SupplychainController_createSupplier_post)
.get('/supplychain/getAllCustomers', SupplychainController_getAllCustomers_get)
