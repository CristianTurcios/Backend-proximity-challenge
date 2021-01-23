import { Request, Response } from 'express';
import Car from '../models/Car';
import { ICar, ICarFormatted } from '../interfaces/car.interface';
import providerValidation from './validations/providerValidations';

const fs = require('fs');
const {
  formatData,
  verifyHeaders,
  readDataFromCsvFile,
} = require('../helpers/helpers');

export const getData = async (request: Request, response: Response) => {
  const { provider } = request.query;

  if (provider) {
    const data = await Car.find({ provider: provider.toString() }) || [];
    return response.status(200).send({ data });
  }

  const data = await Car.find();
  return response.status(200).send({ data });
};

export default async (request: Request, response: Response) => {
  // Validate is the file was uploaded and has the correct mimetype
  if (!request.file) { return response.status(400).send({ error: 'file is required' }); }

  const filePath = request.file.path;
  if ((request.file.mimetype !== 'text/csv' && request.file.mimetype !== 'application/vnd.ms-excel') || request.file.fieldname !== 'file') {
    fs.unlinkSync(filePath);
    return response.status(400).send({ error: 'Invalid upload: file should be in .csv format' });
  }

  // Validate if provider was provided in the request
  const { error } = providerValidation(request.body);
  if (error) { return response.status(400).send({ error: error.details[0].message }); }

  const { provider } = request.body;

  try {
    const data: Array<ICar> = await readDataFromCsvFile(filePath);
    const dataFormatted: Array<ICarFormatted> = await formatData(data, provider);
    const { isValid, missingKeys } = verifyHeaders(dataFormatted[0]);

    if (!isValid) {
      return response.status(400).send({ error: `Missing Headers: ${missingKeys}` });
    }
    // Insert rows in database
    await Car.insertMany(dataFormatted);
  } catch (err) {
    return response.status(400).send({ error: err });
  } finally {
    fs.unlinkSync(filePath);
  }
  return response.status(201).send();
};
