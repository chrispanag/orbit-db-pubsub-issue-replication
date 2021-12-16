const fs = require('fs');

const OrbitDB = require("orbit-db");
const IPFS = require("ipfs-http-client");

const GO_IPFS_HOST = "localhost";
const GO_IPFS_PORT = 5001;

// Constant to change
const NUMBER_OF_DATABASES = 6; // If this is more than 6, then there will be **less pubsub topics open** than databases.

// Just cleanup any previous runs...
fs.rmdirSync('./orbitdb', { recursive: true });

(async () => {
    const ipfs = IPFS.create({ host: GO_IPFS_HOST, port: GO_IPFS_PORT })
    console.log("IPFS is ready");
    const orbit = await OrbitDB.createInstance(ipfs);
    console.log("OrbitDB is ready for opening databases");
    const databases = [];
    for (let i = 0; i < NUMBER_OF_DATABASES; i++) {
        const db = await orbit.docs(`test-issue-database-${i}`);
        databases.push(db);
    }

    console.log("All databases are ready");
    console.log("\n");

    databases.forEach((db) => console.log(db.address.toString()))

    const pubsubTopics = await ipfs.pubsub.ls();

    console.log("\n");
    console.log("Open pubsub topics:")
    console.log(pubsubTopics)

    if (pubsubTopics.length < databases.length) {
        console.log("There are less pubsub topics than databases! :(")
    } else if (pubsubTopics.length == databases.length) {
        console.log("There are the same number of pubsub topics as databases! :)")
    } else {
        // THIS WON'T EVER HAPPEN IF THIS IS THE IPFS NODE IS FRESH
        console.log("There are more pubsub topics than databases! :( You might need to restart your IPFS node.")
    }
})();
