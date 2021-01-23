const {
    formatData,
    verifyHeaders,
} = require('../helpers/helpers');

describe('Validate Helpers', () => {
    it('should validate header and return error', async () => {
        const data = [{
            'uuid': '1',
            'vin': 'PEB66',
            'make': 'Toyota',
            'model': 'Corolla',
            'mileage': '9000',
            'year': '2009',
            'price': '150',
            'zipCode': '111',
            'createDate': '12/1/2020',
            'updateDate': '12/1/2020',
            'provider': 'a'
        }];

        expect(verifyHeaders(data)).toEqual({ "isValid": false, "missingKeys": [
            'provider', 'UUID', 'VIN', 'Make', 'Model', 'Mileage', 'Year', 'Price', 'Zip Code', 'Create Date', 'Update Date'] });
    });
});