const IPFS = require("ipfs-http-client");

const GO_IPFS_HOST = "localhost";
const GO_IPFS_PORT = 5001;

// Constant to change
const NUMBER_OF_TOPICS = 10; // If this is more than 6, then there will be **less pubsub topics open** than topics opened.

(async () => {
    const ipfs = IPFS.create({ host: GO_IPFS_HOST, port: GO_IPFS_PORT })
    console.log("IPFS is ready");
    const topics = [];
    for (let i = 0; i < NUMBER_OF_TOPICS; i++) {
        await ipfs.pubsub.subscribe(`test-topic-${i}`);
        topics.push(`test-topic-${i}`);
    }

    console.log("All topics are ready");
    console.log("\n");

    topics.forEach((t) => console.log(t));

    const pubsubTopics = await ipfs.pubsub.ls();

    console.log("\n");
    console.log("Open pubsub topics:")
    console.log(pubsubTopics)

    if (pubsubTopics.length < topics.length) {
        console.log("There are less pubsub topics than what we opened! :(")
    } else if (pubsubTopics.length == topics.length) {
        console.log("There are the same number of pubsub topics as the ones we opened! :)")
    } else {
        // THIS WON'T EVER HAPPEN IF THE IPFS NODE IS FRESH
        console.log("There are more pubsub topics than the ones we opened! :( You might need to restart your IPFS node.")
    }
})();

await delay()

async function delay() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });
}
