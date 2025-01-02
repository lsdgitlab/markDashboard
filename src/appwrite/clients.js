import { Client, Account, Databases } from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
  .setProject('674db3c500273b1434a0'); // Your project ID

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases };


/*
db
674db8d1001708027c44

collectionId
674f0753002ec8c2c045
*/