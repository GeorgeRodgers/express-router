const { User, Fruit } = require(`./models/index`);
const { seedUsers, seedFruits } = require(`./seedData`);
const db = require(`./db/connection`);
const app = require(`./src/app`);
const request = require(`supertest`);

beforeAll( async () => {
    await db.sync({force: true});
    await User.bulkCreate(seedUsers);
    await Fruit.bulkCreate(seedFruits);
});

describe(`/users GET request`, () => {
    test(`gets the correct response`, async () => {
        const response = await request(app).get(`/users`);
        expect(response.statusCode).toBe(200);
        const responseData = JSON.parse(response.text);
        expect(responseData.length).toBe(seedUsers.length);
        expect(Array.isArray(responseData)).toBe(true);
        for (let i = 0; i < seedUsers.length; i++){
            expect(responseData[i].name).toEqual(seedUsers[i].name);
            expect(responseData[i].age).toEqual(seedUsers[i].age);
        };
    });
});

describe(`./users/:id GET request`, () => {
    test(`gets the correct response`, async () => {
        for (let i = 0; i < seedUsers.length; i++){
            const response = await request(app).get(`/users/${i + 1}`);
            expect(response.statusCode).toBe(200);
            const responseData = JSON.parse(response.text);
            expect(responseData.name).toEqual(seedUsers[i].name);
            expect(responseData.age).toEqual(seedUsers[i].age);
        };
    });
});

describe(`./users POST request`, () => {
    test(`gets the correct response`, async () => {
            const response = await request(app).post(`/users`).send({"name": "createTestName", "age": 123});
            expect(response.statusCode).toBe(200);
            const responseData = JSON.parse(response.text);
            expect(responseData.id).toEqual(seedUsers.length + 1);
            expect(responseData.name).toEqual(`createTestName`);
            expect(responseData.age).toEqual(123);
    });
});

describe(`./users/:id PUT request`, () => {
    test(`gets the correct response`, async () => {
        const response = await request(app).put(`/users/4`).send({"name": "updatedTestName", "age": 321});
        expect(response.statusCode).toBe(200);
        const responseData = JSON.parse(response.text);
        expect(responseData.name).toEqual(`updatedTestName`);
        expect(responseData.age).toEqual(321);
    });
});

describe(`./users/:id DELETE request`, () => {
    test(`gets the correct response`, async () => {
        const response = await request(app).delete(`/users/4`);
        expect(response.statusCode).toBe(200);
        const responseData = JSON.parse(response.text);
        expect(responseData.name).toEqual(`updatedTestName`);
        expect(responseData.age).toEqual(321);
    });
});

afterAll( async () => {
    await db.sync({force: true});
    await User.bulkCreate(seedUsers);
    await Fruit.bulkCreate(seedFruits);
});