#!/bin/bash

echo -e "Setup status: \t"
docker ps --format "{{.Names}} with {{.Status}}" | grep event

status_code=$(curl --write-out %{http_code} --silent --output /dev/null http://localhost:8080/api)
if [[ "$status_code" -eq 200 ]] ; then
    # post a speker and get all speakers
    curl -X POST -H "Content-Type: application/json" -d '{"email": "john@company.com","firstName": "John","lastName": "Doe","joinedSystematic": "2020-03-01"}' http://localhost:8080/api
    curl http://localhost:8080/api
else
    echo "Check setup...docker logs might help"
    
fi


