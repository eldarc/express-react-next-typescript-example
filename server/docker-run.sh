#!/bin/bash
docker run -d --network localnet --env-file ./.env -p=3000:3000 likebase-api
