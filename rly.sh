#!/bin/bash
# Relayed

function begin {
    node ./Relayed.js $1 $2
}

HOST=$1

if [[ -z "$HOST" ]]; then
    echo "Relayed: Please specify the host..."
    exit 2;
fi

if [ $2 ]; then
    PORT=$2;
else
    PORT=80;
fi

TEXT="Relayed: Listening to \"${HOST}\" on port ${PORT}..."
echo $TEXT

begin $HOST $PORT