#!/bin/bash
echo "🧹 Cleaning React Native Android & iOS builds..."

# --- Android Cleanup ---
echo "🧩 Cleaning Android build folders..."
find ~/Desktop/React_Native -type d -path "*/android/app/build" -exec rm -rf {} + \
  && find ~/Desktop/React_Native -type d -path "*/android/build" -exec rm -rf {} +

echo "🧱 Cleaning Gradle caches..."
rm -rf ~/.gradle/caches/
rm -rf ~/.gradle/daemon/
rm -rf ~/.gradle/native/

# --- iOS Cleanup ---
echo "🍎 Cleaning iOS DerivedData..."
rm -rf ~/Library/Developer/Xcode/DerivedData/*


# --- macOS Cache Cleanup ---
echo "🧺 Cleaning general caches..."
rm -rf ~/Library/Caches/*

echo "✅ Cleanup complete! All Android & iOS build artifacts removed."




-----------

nano ~/rn-clean.sh

chmod +x ~/rn-clean.sh

~/rn-clean.sh
