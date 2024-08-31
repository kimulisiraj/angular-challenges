interface TodoModel {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export class Todo {
  constructor(
    public userId: number,
    public id: number,
    public title: string,
    public completed: boolean,
  ) {}

  static isSame(todo1: Todo, todo2: Todo): boolean {
    return (
      todo1.id === todo2.id &&
      todo1.userId === todo2.userId &&
      todo1.title === todo2.title &&
      todo1.completed === todo2.completed
    );
  }

  static updateItemInArray(array: Todo[] = [], item: Todo): Todo[] {
    return array.map((t) => (t.id === item.id ? item : t));
  }

  static deleteItemFromArray(array: Todo[] = [], item: Todo): Todo[] {
    return array.filter((t) => t.id !== item.id);
  }

  static mockData(): TodoModel[] {
    return [
      { userId: 1, id: 1, title: 'delectus aut autem', completed: false },
      {
        userId: 1,
        id: 2,
        title: 'quis ut nam facilis et officia qui',
        completed: false,
      },
      { userId: 1, id: 3, title: 'fugiat veniam minus', completed: false },
      { userId: 1, id: 4, title: 'et porro tempora', completed: true },
      {
        userId: 1,
        id: 5,
        title:
          'laboriosam mollitia et enim quasi adipisci quia provident illum',
        completed: false,
      },
      {
        userId: 1,
        id: 6,
        title: 'qui ullam ratione quibusdam voluptatem quia omnis',
        completed: false,
      },
      {
        userId: 1,
        id: 7,
        title: 'illo expedita consequatur quia in',
        completed: false,
      },
      {
        userId: 1,
        id: 8,
        title: 'quo adipisci enim quam ut ab',
        completed: true,
      },
      {
        userId: 1,
        id: 9,
        title: 'molestiae perspiciatis ipsa',
        completed: false,
      },
      {
        userId: 1,
        id: 10,
        title: 'illo est ratione doloremque quia maiores aut',
        completed: true,
      },
    ];
  }
}
