export interface ICar {
    'UUID': string;
    'VIN': string;
    'Make': string;
    'Model': any;
    'Mileage': string;
    'Year': string;
    'Price': string;
    'Zip Code': string;
    'Create Date': string;
    'Update Date': string;
}

export interface ICarFormatted {
    uuid: string;
    vin: string;
    make: string;
    model: any;
    mileage: string;
    year: string;
    price: string;
    zipCode: string;
    createDate: string;
    updateDate: string;
    provider: string;
}
