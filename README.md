# OrbitDB Pubsub Issue Replication

This repository contains code to replicate the following issue with OrbitDB. Whenever more than 6 orbitdb databases are created/opened, the number of pubsub topics open are less than the number of databases.

## How to run

### Prerequisites

This code expects a running go-ipfs v0.9.1 daemon with the pubsub experiment enabled on `localhost:5001`.

You can start it using the following command:

`ipfs daemon --enable-pubsub-experiment`

### Commands

1. Install dependencies with `yarn` (you could also use `npm`):
2. `yarn start`

## What this code does

This code creates a number of OrbitDB databases based on the value of the `NUMBER_OF_DATABASES` constant. Then, it proceeds to compare the number of databases open to the number of pubsub topics the IPFS node is subscribed to.