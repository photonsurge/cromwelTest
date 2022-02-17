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

#for production the result of 'yarn build' for UI should be hosted using a appropriate application e.g. nginx and the api ran in a container/behind firewall with a proxy to redirect traffic although this was out of scope for this assessment,



#Both the UI and API have unit tests these can be called from each directory by running (note must already of ran 'yarn install')

yarn test