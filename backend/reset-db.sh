#!/bin/bash

echo "Resetting database and reseeding..."

# Navigate to backend directory
cd /home/mikaelajadetaylor/petwoofer/Pet-Woofer/Pet-Woofer/backend

# Reset migrations
npm run db:migrate:undo:all

# Run migrations
npm run db:migrate

# Run seeders
npm run db:seed:all

echo "Database reset and seeded successfully!"
