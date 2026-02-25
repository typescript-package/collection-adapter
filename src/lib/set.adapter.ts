// Interface.
import { CollectionAdapter } from '@typedly/collection';
// @typedly
import { IterValue } from '@typedly/data';
/**
 * @description The synchronous `Set` collection adapter.
 * @export
 * @class SetAdapter
 * @template E The type of the elements in the Set.
 * @template {Set<E>} [T=Set<E>] The type of the underlying Set collection.
 * @implements {CollectionAdapter<E, T, false>}
 */
export class SetAdapter<
  E,
  T extends Set<E> = Set<E>,
> implements CollectionAdapter<E, T, false> {
  public version: string = '1.0.0';
  get [Symbol.toStringTag](): string {
    return 'SetAdapter';
  }
  * [Symbol.iterator](): IterableIterator<IterValue<T>> {
    yield* this.#collection as unknown as IterableIterator<IterValue<T>>;
  }
  public get async(): false {
    return false;
  }
  public get size(): number {
    return this.collection.size;
  }
  public get value() {
    return this.collection;
  }
  protected get collection() {
    return this.#collection;
  }
  #collection: T;
  constructor(...elements: E[]) {
    this.#collection = new Set(elements) as T;
  }
  public add(...element: E[]): this {
    return element.forEach(e => this.collection.add(e)), this;
  }
  public clear(): this {
    return this.collection.clear(), this;
  }
  public destroy(): this {
    return this.clear(), (this.#collection = null as any), this;
  }
  public delete(...element: E[]): boolean {
    return element.every(e => this.collection.delete(e));
  }
  public forEach(callbackfn: (element: E, nextElement: E, collection: CollectionAdapter<E, T, false>) => void, thisArg?: any): this {
    return this.collection.forEach((element, nextElement) => callbackfn.call(thisArg, element, nextElement, this as any)), this;
  }
  public getValue(): T {
    return this.collection;
  }
  public has(...element: E[]): boolean {
    return element.every(e => this.collection.has(e));
  }
  public lock(): this {
    return Object.freeze(this.collection), this;
  }
  public setValue(value: T): this {
    return (this.#collection = value), this;
  }
}
