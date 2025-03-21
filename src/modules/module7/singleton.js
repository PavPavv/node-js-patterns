class DataBase {
  constructor(name, configObj) {
    this.name = name;
    this.user = configObj.user;
  }
}

export const db = new DataBase('baza', { user: 'Test' });