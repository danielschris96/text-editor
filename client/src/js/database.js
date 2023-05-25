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
    // Add timestamp to the data
    const data = { content, timestamp: new Date() };
    await store.put(data);
    console.log('Content added to the database.');
  };
  
  export const getDb = async () => {
    const db = await openDB('jate', 1);
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    // Get all records, sorted by timestamp
    const allRecords = await store.getAll();
    allRecords.sort((a, b) => b.timestamp - a.timestamp);
    // Return the content of the most recent record, or undefined if there are no records
    return allRecords.length > 0 ? allRecords[0].content : undefined;
  };

initdb();