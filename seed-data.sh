hurl invoke supplychain supplychain_createSupplier '{"id": "supplier","address": "address","organizationName": "ORGNAME","authorityNumber": "AUTHNUMBER"}' -u user1
wait
hurl invoke supplychain supplychain_createManufacturer '{"address":"ADDRESS","organizationName":"orgname","authorityNumber":"gy3g633","FDALicenseNumber":"LicNuumber 373","id":"manufacturer"}' -u user2
wait
hurl invoke supplychain supplychain_createDistributor '{"id":"distributor","organizationName":"ORG NAME DIS","address":"adress dis"}' -u user3
wait
hurl invoke supplychain supplychain_createPharmacist '{"address":"Adress","organizationName":"ORGANEM","authorityNumber":"1234","id":"pharmacist"}' -u user4
wait

echo "Seed provisioned"