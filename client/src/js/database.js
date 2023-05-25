import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

  export const putDb = async (content) => {
    const db = await openDB('jate', 1);
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    // Store content inside an object
    const request = store.add({ id: 'content', value: content });
    await request;
    console.log('Content added to the database.');
  };
  
  export const getDb = async () => {
    console.log('GET from the database');
    const db = await openDB('jate', 1);
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    // Get the stored object
    const request = store.get('content');
    const result = await request;
    console.log('result.value', result?.value);
    // Return the content string, not the whole object
    return result?.value || null;
  };

initdb();