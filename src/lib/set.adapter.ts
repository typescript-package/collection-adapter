// Interface.
import { CollectionAdapter } from '@typedly/collection';
/**
 * @description The Set collection adapter.
 * @export
 * @class SetAdapter
 * @template E The type of the elements in the Set.
 * @template [T=Set<E>] The type of the underlying Set collection.
 * @implements {CollectionAdapter<E, T>}
 */
export class SetAdapter<E> implements CollectionAdapter<E, Set<E>> {
  public version: string = '1.0.0';
  get [Symbol.toStringTag](): string {
    return 'SetAdapter';
  }
  [Symbol.iterator](): IterableIterator<E> {
    return this.#collection[Symbol.iterator]();
  }
  protected get collection(): Set<E> {
    return this.#collection;
  }
  public get size(): number {
    return this.collection.size;
  }
  public get value(): Set<E> {
    return this.collection;
  }
  #collection: Set<E>;
  constructor(...collection: E[]) {
    this.#collection = new Set(collection);
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
  public forEach(callbackfn: (element: E, nextElement: E, collection: CollectionAdapter<E, Set<E>>) => void, thisArg?: any): this {
    return this.collection.forEach((element, nextElement) => callbackfn.call(thisArg, element, nextElement, this as any)), this;
  }
  public has(...element: E[]): boolean {
    return element.every(e => this.collection.has(e));
  }
  public lock(): this {
    return Object.freeze(this.collection), this;
  }
  public set(value: Set<E>): this {
    return (this.#collection = value), this;
  }
}
