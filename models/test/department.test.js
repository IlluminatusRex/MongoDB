const Department = require('../department.models.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Department', () => {
  it('should throw an error if no "name" arg', async () => {
    const dep = new Department({});
    try {
      await dep.validate();
      throw new Error('Validation should have failed but did not.');
    } catch (err) {
      expect(err.errors.name).to.exist;
    }
  });

  it('should throw an error if "name" is not a string', async () => {
    const cases = [{}, []];
    for (let name of cases) {
      const dep = new Department({ name });
      try {
        await dep.validate();
        throw new Error('Validation should have failed but did not.');
      } catch (err) {
        expect(err.errors.name).to.exist;
      }
    }
  });

  it('should throw an error if "name" is shorter than 5 signs or longer than 20', async () => {
    const cases = ['Ips', 'Lore', 'Lorem ipsum dolor sit amet, consectetur adipiscing'];
    for (let name of cases) {
      const dep = new Department({ name });
      try {
        await dep.validate();
        throw new Error('Validation should have failed but did not.');
      } catch (err) {
        expect(err.errors.name).to.exist;
      }
    }
  });

  it('should not throw an error if "name" is correct', async () => {
    const cases = ['Marketing', 'Transport'];
    for (let name of cases) {
      const dep = new Department({ name });
      try {
        await dep.validate();
        // If no error is thrown, the validation passed.
      } catch (err) {
        throw new Error(`Validation failed with error: ${err}`);
      }
    }
  });

  after(() => {
    mongoose.models = {};
  });
});