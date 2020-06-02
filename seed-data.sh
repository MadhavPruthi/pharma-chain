hurl invoke supplychain supplychain_createSupplier '{"id": "supplier","address": "Plot No. 572, Shed No. C-1B/73 GIDC Vapi - 396195, Valsad, Gujarat, India","organizationName": "Suvidhi Industries","authorityNumber": "A0175-b5541"}' -u user1
wait
hurl invoke supplychain supplychain_createManufacturer '{"address":"SUN HOUSE, CTS No. 201 B/1, Western Express Highway, Goregaon (E), Mumbai","organizationName":"Sun Pharmaceutical Industries Ltd.","authorityNumber":"D653-26551","FDALicenseNumber":"1654577720","id":"manufacturer"}' -u user2
wait
hurl invoke supplychain supplychain_createDistributor '{"id":"distributor","organizationName":"M/s. Swami Pharmaceutical Distributor","address":"Shop No.2,, Kajheri, Sector 52, Chandigarh"}' -u user3
wait
hurl invoke supplychain supplychain_createPharmacist '{"address":"Booth No. 108, Sector 46C, Sector 46, Chandigarh","organizationName":"Prem Medicos","authorityNumber":"4552b-3652","id":"pharmacist"}' -u user4
wait
hurl invoke supplychain supplychain_createSalt '{"name":"Hydrochloride","id":"salt1"}' -u admin
wait
hurl invoke supplychain supplychain_createSalt '{"name":"Sodium","id":"salt2"}' -u admin

echo "Seed provisioned"