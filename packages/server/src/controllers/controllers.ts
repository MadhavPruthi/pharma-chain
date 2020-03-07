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
export async function SupplychainController_getAllCustomers_get(req: Request, res: Response): Promise<void>{
    try{
        let params = req.params;
        res.status(200).send(await SupplychainControllerBackEnd
            .getAllCustomers());
        
    } catch(ex) {
        console.log('Error get SupplychainController_getAllCustomers', ex.stack);
        res.status(500).send(ex);
    }
}