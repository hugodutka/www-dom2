import { setupDB, newDB } from "./db";

setupDB(newDB())
  .then(() => console.log("db created!"))
  .catch((err) => console.error(err));
