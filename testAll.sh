#!/bin/sh 
find ./dist/ -type f -name "*test.js" -exec k6 run "{}" \;