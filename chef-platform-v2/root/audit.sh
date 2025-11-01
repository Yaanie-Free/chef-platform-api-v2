#!/bin/bash
# 🔍 CODEBASE AUDIT SCRIPT
# Run this in your project root to identify issues

echo "🔍 Starting Codebase Audit..."
echo "================================"
echo ""

# Check for duplicate component folders
echo "📁 Checking for duplicate component folders..."
echo "---"

if [ -d "src/components/luxury" ]; then
    echo "⚠️  FOUND: src/components/luxury/"
    echo "   Files inside:"
    ls -la src/components/luxury/ 2>/dev/null | grep -E '\.(tsx|ts|jsx|js)$' || echo "   (empty or no files)"
    echo ""
fi

if [ -d "src/components/premium" ]; then
    echo "✅ FOUND: src/components/premium/"
    echo "   Files inside:"
    ls -la src/components/premium/ 2>/dev/null | grep -E '\.(tsx|ts|jsx|js)$' || echo "   (empty or no files)"
    echo ""
fi

if [ -d "src/components/redesign" ]; then
    echo "⚠️  FOUND: src/components/redesign/"
    echo "   Files inside:"
    ls -la src/components/redesign/ 2>/dev/null | grep -E '\.(tsx|ts|jsx|js)$' || echo "   (empty or no files)"
    echo ""
fi

if [ -d "src/components/sections" ]; then
    echo "📌 FOUND: src/components/sections/"
    echo "   Files inside:"
    ls -la src/components/sections/ 2>/dev/null | grep -E '\.(tsx|ts|jsx|js)$' || echo "   (empty or no files)"
    echo ""
fi

# Check for multiple layouts
echo ""
echo "📄 Checking for multiple layout files..."
echo "---"
find . -name "layout.tsx" -o -name "layout.ts" -o -name "layout.jsx" -o -name "layout.js" 2>/dev/null

# Check for multiple page files in root
echo ""
echo "📄 Checking for multiple page files..."
echo "---"
find ./app -maxdepth 2 -name "page.tsx" -o -name "page.ts" -o -name "page.jsx" -o -name "page.js" 2>/dev/null

# Check for old/unused config files
echo ""
echo "⚙️  Checking for config files..."
echo "---"
ls -la next.config.* tailwind.config.* tsconfig.* 2>/dev/null

# Check for duplicate type definitions
echo ""
echo "📘 Checking for type definition files..."
echo "---"
find ./src -name "types.ts" -o -name "types.tsx" -o -name "index.d.ts" 2>/dev/null

# Check lib folder structure
echo ""
echo "📚 Checking lib folder..."
echo "---"
if [ -d "src/lib" ]; then
    ls -la src/lib/ 2>/dev/null
else
    echo "❌ src/lib/ not found"
fi

# Check for node_modules issues
echo ""
echo "📦 Checking node_modules..."
echo "---"
if [ -d "node_modules" ]; then
    echo "✅ node_modules exists"
    echo "   Size: $(du -sh node_modules 2>/dev/null | cut -f1)"
else
    echo "❌ node_modules not found - run 'npm install'"
fi

# Check for .next build folder
echo ""
echo "🏗️  Checking build folder..."
echo "---"
if [ -d ".next" ]; then
    echo "✅ .next exists"
    echo "   Size: $(du -sh .next 2>/dev/null | cut -f1)"
    echo "   Recommendation: Clear with 'rm -rf .next' if having issues"
else
    echo "ℹ️  .next not found (will be created on build)"
fi

# Summary
echo ""
echo "================================"
echo "✅ Audit Complete!"
echo ""
echo "📋 RECOMMENDATIONS:"
echo "1. Review the folders marked with ⚠️"
echo "2. Consolidate duplicate components"
echo "3. Remove unused legacy folders"
echo "4. See CLEANUP-GUIDE.md for detailed instructions"