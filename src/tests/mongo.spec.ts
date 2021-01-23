import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

// May require additional time for downloading MongoDB binaries
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

let mongoServer: any;
const opts = {
    useCreateIndex: true,
    retryWrites: false,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
 };

beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri, opts, (err) => {
        if (err) console.error(err);
    });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Cars Collection', () => {
    it('should be create a mongoose schema and count the collections in that schema', async () => {
        const Car = mongoose.model('Car', new mongoose.Schema(
            {
                provider: { type: String, required: true },
                uuid: { type: String, required: true },
                vin: { type: String, required: true },
                make: { type: String, required: true },
                model: { type: String, required: true },
                mileage: { type: String, required: true },
                year: { type: String, required: true },
                price: { type: String, required: true },
                zipCode: { type: String, required: true },
                createDate: { type: String, required: true },
                updateDate: { type: String, required: true },
            },
        ));
        const count = await Car.count();
        expect(count).toEqual(0);
    });
});
