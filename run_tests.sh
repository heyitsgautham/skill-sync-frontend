#!/bin/bash

echo "🧪 Running Frontend Tests..."
echo "================================"

cd /Users/gauthamkrishna/Projects/presidio/skill-sync/skill-sync-frontend

# Run tests
echo "🚀 Running tests..."
CI=true npm test -- --coverage --watchAll=false --passWithNoTests

# Check exit code
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ All frontend tests passed!"
else
    echo ""
    echo "❌ Some frontend tests failed!"
fi
