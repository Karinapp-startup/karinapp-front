@echo off
taskkill /F /IM node.exe
rmdir /s /q node_modules
rmdir /s /q .next
del package-lock.json
npm cache clean --force
npm install 