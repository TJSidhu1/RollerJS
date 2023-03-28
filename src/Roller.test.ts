import {Roller} from './Roller';

// describe("Smoke test", ()=> {
//   test("The test scaffold runs successfully.", ()=> {
//     expect(true).toBe(true);
//   });
// })

// describe("Roller tests", ()=> {
//   test("Description", () => {
//   });
// });

describe('Roller', () => {
  describe('constructor', () => {
    it('should default to a six-sided die if no valid faces are provided', () => {
      const roller = new Roller(0);
      expect(roller['_faces']).toEqual(6);
    });

    it('should set the number of faces to the provided value if it is valid', () => {
      const roller = new Roller(8);
      expect(roller['_faces']).toEqual(8);
    });
  });

  describe('roll', () => {
    it('should return 0 if the value provided is not valid for the number of faces', () => {
      const roller = new Roller(4);
      expect(roller.roll(5)).toEqual(0);
    });

    it('should return the value provided if it is valid for the number of faces', () => {
      const roller = new Roller(4);
      expect(roller.roll(3)).toEqual(3);
    });

    it('should store the value of the roll as the last roll', () => {
      const roller = new Roller(4);
      roller.roll(3);
      expect(roller.last()).toEqual(3);
    });

    it('should update the distribution for the value rolled', () => {
      const roller = new Roller(4);
      roller.roll(3);
      expect(roller.distribution().get(3)).toEqual(1);
    });
  });

  describe('last', () => {
    it('should return 0 if no rolls have been made yet', () => {
      const roller = new Roller(4);
      expect(roller.last()).toEqual(0);
    });

    it('should return the value of the latest die roll', () => {
      const roller = new Roller(4);
      roller.roll(3);
      expect(roller.last()).toEqual(3);
    });
  });

  describe('distribution', () => {
    it('should return a Map with keys for all possible faces and values of 0', () => {
      const roller = new Roller(4);
      const distribution = roller.distribution();
      expect(distribution.size).toEqual(4);
      expect(distribution.get(1)).toEqual(0);
      expect(distribution.get(2)).toEqual(0);
      expect(distribution.get(3)).toEqual(0);
      expect(distribution.get(4)).toEqual(0);
    });

    
    it('should return a Map with updated values for each face that has been rolled', () => {
      const roller = new Roller(4);
      roller.roll(3);
      roller.roll(1);
      roller.roll(2);
      roller.roll(2);
      const distribution = roller.distribution();
      expect(distribution.get(1)).toEqual(1);
      expect(distribution.get(2)).toEqual(2);
      expect(distribution.get(3)).toEqual(1);
      expect(distribution.get(4)).toEqual(0);
    });
  });
});
