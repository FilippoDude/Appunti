#!/bin/sh

# Check if the "done" file exists
if [ -f "done" ]; then
  echo "Setup already completed. Skipping installation steps."
else
  # Update and install necessary packages
  apt-get update -y
  apt-get install -y nano screen
  apt-get clean

  # Install npm dependencies
  npm install vite
  npm install react-router-dom
  npm install -D tailwindcss postcss autoprefixer
  npm install react-router-dom
  npm install react-animate-height

  npx tailwindcss init

  # Create the "done" file to indicate setup is complete
  touch done

fi

# Run the development server
npm run dev --host

echo ""
echo "Everything's ready"
echo ""

# Keep the container running
# screen -dmS app npm run dev --host
tail -f /dev/null