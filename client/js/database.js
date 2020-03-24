localStorage.setItem('useLocalStorage', false);//if false = we use IndexDB & true = we use LocalStorage
const useLocalStorage =
  localStorage.getItem('useLocalStorage') === 'true';

class IndexedDB {
  constructor(nameDB, stores) {
    this.nameDB = nameDB;
    this.stores = stores;
  }

  initializeDB(version) {
    const request = indexedDB.open(
      this.nameDB,
      (version = 1)
    );

    request.onupgradeneeded = event => {
      this.db = event.target.result;
      this.stores.forEach(store => {
        this.db.createObjectStore(store, {
          keyPath: 'id'
        });
      });

      console.log(
        `${this.nameDB} database has been created or updated!`
      );
    };

    request.onsuccess = event => {
      this.db = event.target.result;

      console.log(
        `Successfuly connected to the ${this.nameDB} database!`
      );
    };
    request.onerror = () =>
      console.error(`Error ${request.error}`);
  }

  addToStore(storeName, data) {
    const transaction = this.db.transaction(
      storeName,
      'readwrite'
    );
    const store = transaction.objectStore(storeName);
    const request = store.add(data);

    request.onsuccess = () =>
      console.log('Success! Data has been saved!');
    request.onerror = () =>
      console.error(`Error ${request.error}`);
  }

  getFromStore(storeName) {
    const transaction = this.db.transaction(storeName);
    const store = transaction.objectStore(storeName);
    const request = store.getAll();

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        console.log('Success! Data has been transmitted!');

        resolve(request.result);
      };

      request.onerror = () => {
        console.error(`Error ${request.error}`);
        reject(`Error ${request.error}`);
      };
    });
  }

  clearStore(storeName) {
    const transaction = this.db.transaction(
      storeName,
      'readwrite'
    );
    const store = transaction.objectStore(storeName);
    const request = store.clear();

    request.onsuccess = () =>
      console.log(
        `Success! ${storeName} has been cleared!`
      );

    request.onerror = () =>
      console.error(`Error ${request.error}`);
  }
}

const database = new IndexedDB('SSITA', [
  'comments',
  'news'
]);

database.initializeDB();
