(async function run() {
    const adminDb = db.getSiblingDB("admin");
    const listDatabases = await adminDb.runCommand({ listDatabases: 1 });
    console.log("Databases:", listDatabases.databases);
  
    const smartCityDb = db.getSiblingDB("smart-city");
    const collections = await smartCityDb.getCollectionNames();
    console.log("Collections in smart-city:", collections);
  
    const sessions = await smartCityDb.sessions.find().toArray();
    console.log("Sessions in smart-city:", sessions);
  })().catch(err => console.error("Error:", err));
  