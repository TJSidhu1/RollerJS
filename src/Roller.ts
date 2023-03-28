export class Roller {
    private _distribution: Map<number, number>;
    private _last: number;
    private _faces: number;

    // specifies the number of faces the die has. It must have at least 2 faces
    // so any invalid values should default to 6 to represent the common 
    // six-sided die.
    constructor(faces: number) {
        if (faces >= 2) {
            this._faces = faces;
        } else {
            this._faces = 6;
        }
        this._distribution = new Map<number, number>();
        for (let i = 1; i <= this._faces; i++) {
            this._distribution.set(i, 0);
        }
    }

    // specifies which number should be rolled and returns the recorded roll. 
    // If the value provided is not valid for the number of faces the die has,
    // no record of the roll should be made and 0 should be returned. However,
    // if the value provided is between 1 and the number of faces (inclusive),
    // then:
    //   1. that same value should be returned,
    //   2. that value should be stored as the last roll, and
    //   3. the distribution should update the distribution record so that the
    //      key (value rolled) has an updated value that increases the number
    //      of rolls for that face by 1
    private lastRoll: number = 0;

    roll(value: number): number {
        if (value < 1 || value > this._faces) {
            return 0;
        }
        this.lastRoll = value;
        const count = this._distribution.get(value);
        if (count !== undefined) {
            this._distribution.set(value, count + 1);
        }
        return value;
    }

    // returns the value of the latest die roll. If no rolls have been made
    // yet, then it should return 0.
    last(): number {
        return this.lastRoll;
    }

    // returns a Map that represents the current distribution of rolls for each
    // possible face that can be rolled. The map's key should be the face
    // value and its value should be the number of times that face has been
    // rolled. Even if a face has not yet been rolled, its key should have a
    // value of 0.
    distribution(): Map<number, number> {
        return new Map<number, number>(this._distribution);
    }
}
