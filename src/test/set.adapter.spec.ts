import { Collection } from '@typescript-package/collection';
import { SetAdapter } from '../lib';

const collection = new Collection({async: false, value: new Set([1, 2, 3])}, SetAdapter, 1, 2, 3);

// Adds.
collection.add(27, 29, 31, 33);
// Deletes.
collection.delete(29, 31);

console.log(`size: `, collection.size); // Output: 5