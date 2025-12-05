#!/bin/bash

# Cleanup script to remove old CSS files after Tailwind migration
# Run this script from the project root: ./cleanup-old-css.sh

echo "🧹 Cleaning up old CSS files..."

# Remove old App.css (replaced by app.css)
if [ -f "src/App.css" ]; then
    rm "src/App.css"
    echo "✅ Removed src/App.css"
fi

# Remove entire styles directory
if [ -d "src/styles" ]; then
    rm -rf "src/styles"
    echo "✅ Removed src/styles/ directory"
fi

echo ""
echo "✨ Cleanup complete!"
echo ""
echo "The following files were removed:"
echo "  - src/App.css"
echo "  - src/styles/variables.css"
echo "  - src/styles/base.css"
echo "  - src/styles/animations.css"
echo "  - src/styles/components/*.css"
echo "  - src/styles/pages/*.css"
echo ""
echo "Your app is now using Tailwind CSS exclusively!"
echo "All styles are in src/app.css and component files."

