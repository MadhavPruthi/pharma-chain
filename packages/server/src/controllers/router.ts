import * as express from 'express';
import { 
    SupplychainController_createSupplier_post,
    SupplychainController_createManufacturer_post,
    SupplychainController_createDistributor_post,
    SupplychainController_createPharmacist_post,
    SupplychainController_createSalt_post,
    SupplychainController_createSaltBatch_post,
    SupplychainController_getAllSuppliers_get,
    SupplychainController_getSupplierById_get,
    SupplychainController_getAllManufacturers_get,
    SupplychainController_getManufacturerById_get,
    SupplychainController_getAllDistributors_get,
    SupplychainController_getDistributorById_get,
    SupplychainController_getAllPharmacists_get,
    SupplychainController_getPharmacistById_get,
    SupplychainController_getDrugBatchByParticipant_get,
    SupplychainController_getAllModels_get,
    SupplychainController_getAllDrugBatchs_get,
    SupplychainController_getAllSaltBatchs_get,
    SupplychainController_getDrugBatchHistory_get,
    SupplychainController_fetchSalts_post,
    SupplychainController_getRawMaterialFromSupplier_post,
    SupplychainController_manufactureDrugs_post,
    SupplychainController_shipProductsFromManufacturerToDistributor_post,
    SupplychainController_receiveProductsFromManufacturerByDistributor_post,
    SupplychainController_exportProductsToPharmacist_post,
    SupplychainController_buyProductsFromPharmacist_post,
    SupplychainController_getAllTransactions_get } from './controllers'
export default express.Router()
.post('/supplychain/createSupplier', SupplychainController_createSupplier_post)
.post('/supplychain/createManufacturer', SupplychainController_createManufacturer_post)
.post('/supplychain/createDistributor', SupplychainController_createDistributor_post)
.post('/supplychain/createPharmacist', SupplychainController_createPharmacist_post)
.post('/supplychain/createSalt', SupplychainController_createSalt_post)
.post('/supplychain/createSaltBatch', SupplychainController_createSaltBatch_post)
.get('/supplychain/getAllSuppliers', SupplychainController_getAllSuppliers_get)
.get('/supplychain/getSupplierById/:supplierId', SupplychainController_getSupplierById_get)
.get('/supplychain/getAllManufacturers', SupplychainController_getAllManufacturers_get)
.get('/supplychain/getManufacturerById/:manufacturerId', SupplychainController_getManufacturerById_get)
.get('/supplychain/getAllDistributors', SupplychainController_getAllDistributors_get)
.get('/supplychain/getDistributorById/:distributorId', SupplychainController_getDistributorById_get)
.get('/supplychain/getAllPharmacists', SupplychainController_getAllPharmacists_get)
.get('/supplychain/getPharmacistById/:pharmacistId', SupplychainController_getPharmacistById_get)
.get('/supplychain/getDrugBatchByParticipant/:id/:type', SupplychainController_getDrugBatchByParticipant_get)
.get('/supplychain/getAllModels', SupplychainController_getAllModels_get)
.get('/supplychain/getAllDrugBatchs', SupplychainController_getAllDrugBatchs_get)
.get('/supplychain/getAllSaltBatchs', SupplychainController_getAllSaltBatchs_get)
.get('/supplychain/getDrugBatchHistory/:drugBatchId', SupplychainController_getDrugBatchHistory_get)
.post('/supplychain/fetchSalts', SupplychainController_fetchSalts_post)
.post('/supplychain/getRawMaterialFromSupplier', SupplychainController_getRawMaterialFromSupplier_post)
.post('/supplychain/manufactureDrugs', SupplychainController_manufactureDrugs_post)
.post('/supplychain/shipProductsFromManufacturerToDistributor', SupplychainController_shipProductsFromManufacturerToDistributor_post)
.post('/supplychain/receiveProductsFromManufacturerByDistributor', SupplychainController_receiveProductsFromManufacturerByDistributor_post)
.post('/supplychain/exportProductsToPharmacist', SupplychainController_exportProductsToPharmacist_post)
.post('/supplychain/buyProductsFromPharmacist', SupplychainController_buyProductsFromPharmacist_post)
.get('/supplychain/getAllTransactions', SupplychainController_getAllTransactions_get)
