#!/bin/bash

# Drop all
mongo testing --eval "db.dropDatabase()"

# Import data
mongoimport --db testing --collection users --file ./tests/data/users.json
