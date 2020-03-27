import { Request, Response } from 'express';
import { SupplychainControllerBackEnd } from '../convector';


export async function SupplychainController_createSupplier_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await SupplychainControllerBackEnd
                .createSupplier(params.supplier));
            
    } catch(ex) {
        console.log('Error post SupplychainController_createSupplier', ex.stack);
        res.status(500).send(ex);
    }
}
export async function SupplychainController_createManufacturer_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await SupplychainControllerBackEnd
                .createManufacturer(params.manufacturer));
            
    } catch(ex) {
        console.log('Error post SupplychainController_createManufacturer', ex.stack);
        res.status(500).send(ex);
    }
}
export async function SupplychainController_createDistributor_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await SupplychainControllerBackEnd
                .createDistributor(params.distributor));
            
    } catch(ex) {
        console.log('Error post SupplychainController_createDistributor', ex.stack);
        res.status(500).send(ex);
    }
}
export async function SupplychainController_createPharmacist_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await SupplychainControllerBackEnd
                .createPharmacist(params.pharmacist));
            
    } catch(ex) {
        console.log('Error post SupplychainController_createPharmacist', ex.stack);
        res.status(500).send(ex);
    }
}
export async function SupplychainController_createSalt_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await SupplychainControllerBackEnd
                .createSalt(params.salt));
            
    } catch(ex) {
        console.log('Error post SupplychainController_createSalt', ex.stack);
        res.status(500).send(ex);
    }
}
export async function SupplychainController_createSaltBatch_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await SupplychainControllerBackEnd
                .createSaltBatch(params.saltBatch));
            
    } catch(ex) {
        console.log('Error post SupplychainController_createSaltBatch', ex.stack);
        res.status(500).send(ex);
    }
}
export async function SupplychainController_getAllSuppliers_get(req: Request, res: Response): Promise<void>{
    try{
        let params = req.params;
        res.status(200).send(await SupplychainControllerBackEnd
            .getAllSuppliers());
        
    } catch(ex) {
        console.log('Error get SupplychainController_getAllSuppliers', ex.stack);
        res.status(500).send(ex);
    }
}
export async function SupplychainController_getSupplierById_get(req: Request, res: Response): Promise<void>{
    try{
        let params = req.params;
        res.status(200).send(await SupplychainControllerBackEnd
            .getSupplierById(params.supplierId));
        
    } catch(ex) {
        console.log('Error get SupplychainController_getSupplierById', ex.stack);
        res.status(500).send(ex);
    }
}
export async function SupplychainController_getAllManufacturers_get(req: Request, res: Response): Promise<void>{
    try{
        let params = req.params;
        res.status(200).send(await SupplychainControllerBackEnd
            .getAllManufacturers());
        
    } catch(ex) {
        console.log('Error get SupplychainController_getAllManufacturers', ex.stack);
        res.status(500).send(ex);
    }
}
export async function SupplychainController_getManufacturerById_get(req: Request, res: Response): Promise<void>{
    try{
        let params = req.params;
        res.status(200).send(await SupplychainControllerBackEnd
            .getManufacturerById(params.manufacturerId));
        
    } catch(ex) {
        console.log('Error get SupplychainController_getManufacturerById', ex.stack);
        res.status(500).send(ex);
    }
}
export async function SupplychainController_getAllDistributors_get(req: Request, res: Response): Promise<void>{
    try{
        let params = req.params;
        res.status(200).send(await SupplychainControllerBackEnd
            .getAllDistributors());
        
    } catch(ex) {
        console.log('Error get SupplychainController_getAllDistributors', ex.stack);
        res.status(500).send(ex);
    }
}
export async function SupplychainController_getDistributorById_get(req: Request, res: Response): Promise<void>{
    try{
        let params = req.params;
        res.status(200).send(await SupplychainControllerBackEnd
            .getDistributorById(params.distributorId));
        
    } catch(ex) {
        console.log('Error get SupplychainController_getDistributorById', ex.stack);
        res.status(500).send(ex);
    }
}
export async function SupplychainController_getAllPharmacists_get(req: Request, res: Response): Promise<void>{
    try{
        let params = req.params;
        res.status(200).send(await SupplychainControllerBackEnd
            .getAllPharmacists());
        
    } catch(ex) {
        console.log('Error get SupplychainController_getAllPharmacists', ex.stack);
        res.status(500).send(ex);
    }
}
export async function SupplychainController_getPharmacistById_get(req: Request, res: Response): Promise<void>{
    try{
        let params = req.params;
        res.status(200).send(await SupplychainControllerBackEnd
            .getPharmacistById(params.pharmacistId));
        
    } catch(ex) {
        console.log('Error get SupplychainController_getPharmacistById', ex.stack);
        res.status(500).send(ex);
    }
}
export async function SupplychainController_getAllModels_get(req: Request, res: Response): Promise<void>{
    try{
        let params = req.params;
        res.status(200).send(await SupplychainControllerBackEnd
            .getAllModels());
        
    } catch(ex) {
        console.log('Error get SupplychainController_getAllModels', ex.stack);
        res.status(500).send(ex);
    }
}
export async function SupplychainController_fetchSalts_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await SupplychainControllerBackEnd
                .fetchSalts(params.supplierId,params.rawMaterialSupply));
            
    } catch(ex) {
        console.log('Error post SupplychainController_fetchSalts', ex.stack);
        res.status(500).send(ex);
    }
}
export async function SupplychainController_getRawMaterialFromSupplier_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await SupplychainControllerBackEnd
                .getRawMaterialFromSupplier(params.manufacturerId,params.supplierId,params.rawMaterialSupply));
            
    } catch(ex) {
        console.log('Error post SupplychainController_getRawMaterialFromSupplier', ex.stack);
        res.status(500).send(ex);
    }
}
export async function SupplychainController_manufactureDrugs_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await SupplychainControllerBackEnd
                .manufactureDrugs(params.manufacturerId,params.rawMaterialConsumed,params.drugName,params.genericName,params.productsCreated,params.expiryDate));
            
    } catch(ex) {
        console.log('Error post SupplychainController_manufactureDrugs', ex.stack);
        res.status(500).send(ex);
    }
}
export async function SupplychainController_shipProductsFromManufacturerToDistributor_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await SupplychainControllerBackEnd
                .shipProductsFromManufacturerToDistributor(params.manufacturerId,params.distributorId,params.drugName,params.shippingID));
            
    } catch(ex) {
        console.log('Error post SupplychainController_shipProductsFromManufacturerToDistributor', ex.stack);
        res.status(500).send(ex);
    }
}
export async function SupplychainController_receiveProductsFromManufacturerByDistributor_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await SupplychainControllerBackEnd
                .receiveProductsFromManufacturerByDistributor(params.distributorId,params.shippingID));
            
    } catch(ex) {
        console.log('Error post SupplychainController_receiveProductsFromManufacturerByDistributor', ex.stack);
        res.status(500).send(ex);
    }
}