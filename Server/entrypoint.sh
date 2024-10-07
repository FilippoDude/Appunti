#!/bin/sh

# Check if the "done" file exists
if [ -f "done" ]; then
  echo "Setup already completed. Skipping installation steps."
else
  # Update package lists
  apt-get update -y
  
  # Install necessary packages
  apt-get install -y nano screen curl
  apt-get install -y nodejs npm

  # Install npm dependencies
  npm install express
  npm install cors
  npm install @telegram-apps/init-data-node
  npm install ws
  npm install typescript ts-node nodemon ws @types/ws @types/node @types/express @types/cors  --save-dev 

  # Clean up to reduce image size
  apt-get clean

  # Create the "done" file to indicate setup is complete
  touch done
fi

# Change to the app directory
cd /app

# Run the server
npm run dev
#screen -dmS app node main.js

echo ""
echo "Server Ready!"
echo ""

# Keep the container running
tail -f /dev/null
