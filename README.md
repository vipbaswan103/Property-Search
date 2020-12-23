# Property-Search
Website which allows the user to query for properties in UK

## Index
- [Objectives](#objectives-index)
- [Directory structure](#directory-structure-index)
- [Tech used](#tech-used-index)
- [Dev setup](#dev-setup-index)
- [How to run](#how-to-run-index)
- [Features](#features-index)
- [Site demo](#site-demo-index)
- [Challenges and Future scope](#challenges-and-future-scope-index)
- [Credits](#credits-index)

## Objectives [[Index](#index)]
- Create a website which allows user to search for property near an area selected (in UK only)
- Display all the properties matching the requirements (various filters are provided for this) to the user. Allow the user to download the resuls in an excel file. 
- Allow user to sort (in ascending or descending) the property results based on various criteria (like price)
- Allow user to view the details of a particular property selected from all the property results. The details would show features of the property and the neigbourhood. User would also be able to view various properties similar to the one selected

## Directory structure [[Index](#index)]
```bash
.
├── README.md
├── package-lock.json
├── package.json
├── property_search.py
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── requirements.txt
├── server.py
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── Components
    │   ├── detailsPage.jsx
    │   ├── queryForm.jsx
    │   └── result.jsx
    ├── index.css
    ├── index.js
    ├── logo.svg
    ├── myStyles.css
    ├── serviceWorker.js
    └── setupTests.js
```
- [queryForm.jsx](/src/Components/queryForm.jsx) contains the code for the webpage where user would fill the details for the property (like the area, search radius, flat/house/etc, price range, etc).
- [result.jsx](/src/Components/result.jsx) contains the code which renders the result that is returned by the web-service (which uses `Zoopla` API to fetch the properties). It also implements the logic for paging, sorting, downloading, etc.
- [detailsPage.jsx](/src/Components/detailsPage.jsx) contains the code which renders the complete details of a particular property that the user is interested in (which he would be able to select from the results)
- [property_search.py](/property_search.py) uses the `Zoopla` API to fetch the results based on the query of the user. 
- [server.py](/server.py) implements the web-service which is queried from `queryForm.jsx`

## Tech used [[Index](#index)]
- python3.8 or above
- node and npm
- OS used: Ubuntu 18.04

## Dev setup [[Index](#index)]
- Install python either [from source or from PPA](https://tech.serhatteker.com/post/2019-12/how-to-install-python38-on-ubuntu/). Here's how to install python3.8 using PPA:
  ```bash
  sudo apt update
  sudo apt install software-properties-common
  sudo add-apt-repository ppa:deadsnakes/ppa
  sudo apt update
  sudo apt install python3.8
  ```
  Check the installationg using `python3.8 --version`. You should get appropriate version as output if installation was successful.
  
- Install [node and npm](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04) (v12.18.4 or above). You can either use PPA or NVM. Here we'll show how to do it using NVM:
  ```bash
  curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.35.3/install.sh -o install_nvm.sh
  nano install_nvm.sh
  bash install_nvm.sh
  source ~/.profile
  nvm install 12.18.4
  ```
  `source ~/.profile` lets the current session know about the changes made in `~/.profile` by `install_nvm.sh`. You can also log out and log in back to get the same effect.
  
  To check the installation, use `node --version`. You should get appropraite version (`v12.18.4` in our case) as output.

- Install [pipenv](https://pipenv.pypa.io/en/latest/basics/#environment-management-with-pipenv). This was used by us to do the development in virtual environment. You can use `venv` also, but here we'll show using only pipenv.
  ```bash
  python3.8 -m pip install pipenv
  ```

## How to run [[Index](#index)]
Assuming that you already have dev env set up, follow the instructions below:
- Spawn a virtual environment using pip and run the web service
  - Run `pipenv shell`. This will create a new virtual envrionment for the first time (i.e. if it already exists, it will simply log you into that virtual env). This will also convert your `requirements.txt` into `Pipfile`.
  - Run `pipenv install`. This will install all the packages required by your web-service. **Note that this would be done only once for a particular virtual env. If you delete this current virtual env, you'll have to repeat the whole process again.**
  - Run `python3.8 server.py`. This will launch the web service in dev mode at port `5000` i.e at [http://localhost:5000/](http://localhost:5000/)
- Open a new terminal to start the process of rendering the website.
  - Go to the main directory (which contains `package-lock.json`)
  - Run `npm install`. This will create a new folder `node_modules` and install all the necessary packages. **Note that this would be done only once.**
  - Run `npm start` to render your website. The site is rendered at port `3000` i.e. at [http://localhost:3000/](http://localhost:3000/)

## Features [[Index](#index)]
- User can query using various properties:
  - minimum and maximum price
  - minimum and maximum #beds
  - property type
  - date added
  - distance from entered location (basically the search radius)
  - filters like modernisation, quick sale, cash only, etc
- The result can be:
  - sorted in ascending or descending order based on various properties like price
  - downloaded in an excel file
- User can also see the complete details of an individual property selected from the result above (by clicking on the link named `Details`). The details given to the user would be:
  - Agent info (contact number, address, name)
  - property description, floor plan, bedrooms,bathrooms, floors count
  - graph of crime rates, average values, school performance in area, council tax in area, population breakdown in area, values range distribution, value trend, home values
  - list of similar sold properties in the area
  - list of similar for sale properties in the area
  - list of similar for rent properties in the area
  
## Site demo [[Index](#index)]
  ![Site demo gif](Demo.gif)
  
## Challenges and Future scope [[Index](#index)]
- This project uses `Zoopla` API (the free version, which allows you to query 100 times in an hour). This API is no longer under maintainance. May be some other APIs can be used for a better development exerience.
- Few features like calculators couldn't be implemented because either they weren't available with `Zoopla` or their logic wasn't public.
- Site can be made public by hosting the webservice and running the `node` in production mode.

## Credits [[Index](#index)]
This project was done in collaboration with [Harpinder](https://github.com/SinghCoder). I hereby acknowledge all of his contributions in completion of this project.
