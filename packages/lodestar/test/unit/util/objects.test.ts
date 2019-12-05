import BN from "bn.js";
import {expect} from "chai";
import {uint64} from "@chainsafe/eth2.0-types";
import {config} from "@chainsafe/eth2.0-config/lib/presets/mainnet";
import {arrayIntersection, mostFrequent, sszEqualPredicate} from "../../../src/util/objects";
import {describe, it} from "mocha";

describe("Objects helper", () => {

  it("return most frequent objects", () => {
    const obj1 = new BN(1);
    const obj2 = new BN(2);
    const obj3 = new BN(3);
    const array = [];
    array.push(obj1);
    array.push(obj1);
    array.push(obj3);
    array.push(obj2);
    array.push(obj3);
    array.push(obj1);
    array.push(obj3);
    const result = mostFrequent<uint64>(array, config.types.uint64);
    expect(result).to.be.deep.equal([obj1, obj3]);
  });
  
  it("should return array intersection", function () {
    const array1 = [2, 5, 7, 8];
    const array2 = [1, 5, 7, 9];
    const result = arrayIntersection<number>(array1, array2, sszEqualPredicate(config.types.number64));
    expect(result).to.be.deep.equal([5, 7]);

  });

});
