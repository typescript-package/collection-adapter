// Interface.
import { CollectionAdapter } from '@typedly/collection';
// @typedly
import { IterValue } from '@typedly/data';
/**
 * @description The synchronous `Array` collection adapter.
 * @export
 * @class ArrayAdapter
 * @template E The type of the elements in the Array.
 * @template {Array<E>} [T=Array<E>] The type of the underlying Array collection.
 * @implements {CollectionAdapter<E, T, false>}
 */
export class ArrayAdapter<
  E,
  T extends Array<E> = Array<E>,
> implements CollectionAdapter<E, T, false> {
  public version: string = '1.0.0';
  get [Symbol.toStringTag](): string {
    return 'ArrayAdapter';
  }
  * [Symbol.iterator](): IterableIterator<IterValue<T>> {
    yield* this.#collection as unknown as IterableIterator<IterValue<T>>;
  }
  public get async(): false {
    return false;
  }
  public get size(): number {
    return this.collection.length;
  }
  public get value(): T {
    return this.collection;
  }
  protected get collection(): T {
    return this.#collection;
  }
  #collection: T;
  constructor(...collection: E[]) {
    this.#collection = new Array(...collection) as T;
  }
  public add(...element: E[]): this {
    return element.forEach(e => this.collection.push(e)), this;
  }
  public clear(): this {
    return this.collection.length = 0, this;
  }
  public destroy(): this {
    return this.clear(), (this.#collection = null as any), this;
  }
  public delete(...element: E[]): boolean {
    return element.every(e => {
      const index = this.collection.indexOf(e);
      if (index === -1) return false;
      this.collection.splice(index, 1);
      return true;
    });
  }
  public forEach(
    callbackfn: (element: E, nextElement: E, collection: CollectionAdapter<E, T, false>) => void,
    thisArg?: any
  ): this {
    return this.collection.forEach(
      (element, nextElement, array) => callbackfn.call(
        thisArg,
        element,
        array.length > nextElement + 1 ? array[nextElement + 1] : undefined as E,
        this as any
      )),
      this;
  }
  public getValue(): T {
    return this.collection;
  }
  public has(...element: E[]): boolean {
    return element.every(e => this.collection.indexOf(e) !== -1);
  }
  public lock(): this {
    return Object.freeze(this.collection), this;
  }
  public setValue(value: T): this {
    return (this.#collection = value), this;
  }
}
