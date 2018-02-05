export class Post {

  permalink_url: string;
  id: string;
  constructor(obj?: any) {
    this.permalink_url = obj && obj.permalink_url|| null;
    this.id = obj && obj.id || null;

  }


}
export class List<T> {
  private items: Array<T>;

  constructor() {
    this.items = [];
  }

  size(): number {
    return this.items.length;
  }

  add(value: T): void {
    this.items.push(value);
  }

  get(index: number): T {
    return this.items[index];
  }
}
