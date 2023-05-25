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

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Adding content to the database:', content);

  // Create a connection to the database and specify the desired database and data privileges.
  const db = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = db.transaction('jate', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Wrap content in an object before adding it to the object store.
  const objectToAdd = { content };
  
  // Add the content to the object store.
  const request = store.add(objectToAdd);

  // Wait for the transaction to complete.
  await tx.done;

  // Get confirmation of the request.
  const result = await request;
  console.log("added content", result);
  return result;
};



export const getDb = async () => {
  console.log('GET from the database');

  // Create a connection to the database and specify the desired database and version we want to use.
  const db = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = db.transaction('jate', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .getAll() method to get all data in the database.
  const results = await store.getAll();

  // Extract the latest content from the results.
  const latestContent = results.length ? results[results.length - 1].content : null;
  
  console.log('Latest content from database:', latestContent);
  return latestContent;
};

initdb();