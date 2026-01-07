#!/bin/bash
cd /home/kavia/workspace/code-generation/cultural-content-creator-for-hispanic-communities-227577-227586/content_strategy_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

