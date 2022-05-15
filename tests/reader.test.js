/* eslint-disable @typescript-eslint/no-var-requires */
const { expect } = require('chai');
const request = require('supertest');
const { Reader } = require('../src/models');
const app = require('../src/app');

describe('/readers', () => {
    before(async () => Reader.sequelize.sync());



    describe('with no records in the database', () => {
        beforeEach(async () => {
            try { await Reader.destroy({ where: {} }); }
            catch (err) { console.log(err); }
        });
        describe('POST /readers', () => {
            it('creates a new reader in the database', async () => {
                try {
                    const response = await request(app).post('/readers').send({
                        name: 'Elizabeth Bennet',
                        email: 'future_ms_darcy@gmail.com',
                    });

                    expect(response.status).to.equal(201);
                }
                catch (err) { console.error(err) }
            });
        });
    });
});