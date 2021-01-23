import { ICar, ICarFormatted } from '../interfaces/car.interface';
import { IVerifyHeaders } from '../interfaces/verifyHeaders.interface';

const csv = require('csvtojson');

const allowedColums = [
  { name: 'provider', formattedName: 'provider' },
  { name: 'UUID', formattedName: 'uuid' },
  { name: 'VIN', formattedName: 'vin' },
  { name: 'Make', formattedName: 'make' },
  { name: 'Model', formattedName: 'model' },
  { name: 'Mileage', formattedName: 'mileage' },
  { name: 'Year', formattedName: 'year' },
  { name: 'Price', formattedName: 'price' },
  { name: 'Zip Code', formattedName: 'zipCode' },
  { name: 'Create Date', formattedName: 'createDate' },
  { name: 'Update Date', formattedName: 'updateDate' },
];

const readDataFromCsvFile = (filePath: string): Array<ICar> => csv({ delimiter: ';', trim: true }).fromFile(filePath);

const formatData = async (data: Array<ICar>, provider: string): Promise<ICarFormatted[]> => {
  const formattedData: Array<ICarFormatted> = [];

  data.forEach((element: ICar) => {
    const item = {
      uuid: element.UUID,
      vin: element.VIN,
      make: element.Make,
      model: element.Model,
      mileage: element.Mileage,
      year: element.Year,
      price: element.Price,
      zipCode: element['Zip Code'],
      createDate: element['Create Date'],
      updateDate: element['Update Date'],
      provider,
    };
    formattedData.push(item);
  });
  return formattedData;
};

const verifyHeaders = (data: ICar): IVerifyHeaders => {
  const keys = Object.keys(data);
  let isValid = true;
  const missingKeys = [];

  for (const element of allowedColums) {
    if (!keys.includes(element.formattedName)) {
      isValid = false;
      missingKeys.push(element.name);
    }
  }

  const validation: IVerifyHeaders = {
    isValid,
    missingKeys,
  };

  return validation;
};

module.exports = {
  formatData,
  verifyHeaders,
  readDataFromCsvFile,
};
