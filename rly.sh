#!/bin/bash
# Relayed

function begin {
    echo "Relaying: $1:$2";
    node ./Relayed.js $1 $2
}

begin $1 $2