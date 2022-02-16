#the project is split between UI and API


#requires the following to be installed; nodejs, mongodb, yarn


#please open two terminals (for UI / Api)

#UI - to install / run locally



cd ui/
yarn install
yarn start

#api - to install / run locally



cd api/
yarn install
yarn dev


#Once both are running browse to http://localhost:3000

#This will run the UI and API and alow testing. However for production this should not be used.



#Both the UI and API have unit tests these can be called from each directory by running (note must already of ran 'yarn install')

yarn test