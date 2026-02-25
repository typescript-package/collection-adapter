import { Collection } from '@typescript-package/collection';
import { ArrayAdapter } from '../lib';

const collection = new Collection(ArrayAdapter, 1, 2, 3);

// Adds.
collection.add(27, 29, 31, 33);
// Deletes.
collection.delete(29, 31);

console.log(`size: `, collection.size); // Output: 5