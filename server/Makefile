.PHONY: start-mongo
start-mongo:
	docker-compose -f ./docker-compose.dev.yml up -d

.PHONY: start-mongo-verbose
start-mongo-verbose:
	docker-compose -f ./docker-compose.dev.yml up

.PHONY: stop-mongo
stop-mongo:
	docker-compose -f ./docker-compose.dev.yml stop

.PHONY: remove-mongo
remove-mongo:
	docker-compose -f ./docker-compose.dev.yml down
