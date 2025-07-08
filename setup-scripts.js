const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Add the required scripts
packageJson.scripts = {
  ...packageJson.scripts,
  "dev": "next dev --port 5000",
  "build": "next build", 
  "start": "next start --port 5000",
  "lint": "next lint",
  "db:generate": "drizzle-kit generate",
  "db:push": "drizzle-kit push",
  "db:studio": "drizzle-kit studio",
  "server": "tsx server/index.ts"
};

// Add type module if needed
packageJson.type = "module";

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log('Package.json scripts added successfully!');