#!/bin/bash
set -e

clean_up () {
  echo "[CI] Stopping test server"
  kill -15 $SERVER_PID
}

trap clean_up EXIT

echo '[CI] Starting test server'
node tests/server.js &
SERVER_PID=$!

echo '[CI] Running tests'
cypress run
