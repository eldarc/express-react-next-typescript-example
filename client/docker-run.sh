#!/bin/bash
docker run -e APP_RELEASE_STAGE=production -p=8080:3000 likebase-app
