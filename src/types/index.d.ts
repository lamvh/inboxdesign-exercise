export type TTodoItem = {
  id: number,

  /**
   * Content
   */
  todo: string,

  completed: boolean,

  userId: number
};

export type TTodoList = TTodoItem[];