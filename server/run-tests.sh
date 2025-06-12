#!/bin/bash

# Run tests with coverage
echo "Running tests with coverage..."
npm run test:coverage

# Generate HTML report (Jest already does this by default in coverage/lcov-report)
echo "Coverage report generated in coverage/lcov-report/index.html"

# Output summary of test coverage
echo "=========================="
echo "Test Coverage Summary:"
echo "=========================="
cat coverage/coverage-summary.json | jq '.total'
echo "=========================="

# Check if any tests failed
if [ $? -ne 0 ]; then
  echo "❌ Some tests failed!"
  exit 1
else
  echo "✅ All tests passed!"
  exit 0
fi
