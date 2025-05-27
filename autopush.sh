#!/bin/bash

# Auto commit and push script

git add .
git commit -m "Auto commit: $(date '+%Y-%m-%d %H:%M:%S')"
git push origin main
