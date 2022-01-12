'use strict';

const chai = require('chai');

const expect = chai.expect;
const Support = require('../../support');

const dialect = Support.getTestDialect();

if (dialect.startsWith('mariadb')) {
  describe('QueryInterface', () => {

    describe('databases', () => {
      it('should create and drop database', async function () {
        const res = await this.sequelize.query('SHOW DATABASES');
        const databaseNumber = res[0].length;
        await this.sequelize.getQueryInterface().createDatabase('myDB');
        const databases = await this.sequelize.query('SHOW DATABASES');
        expect(databases[0]).to.have.length(databaseNumber + 1);
        await this.sequelize.getQueryInterface().dropDatabase('myDB');
      });
    });
  });
}
