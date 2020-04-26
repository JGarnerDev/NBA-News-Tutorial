- Startup console commands

  - npm start to initialize the app
  - npm run serv (runs "json-server --watch db.json --port 3004")

* File structure

  Previous works were known to be disorganized; let's avoid that.

  - src
    - Components (views/widgets/HOC)
      - Component
        - Component.js
        - Component.module.css

- Database for demo purposes

  - typicode's json-server for a fake REST API
  - https://www.mockaroo.com/ for a dummy database, placed as db.json
  - GET requests are made to localhost:3004/articles or localhost:3004/videos or  
    localhost:3004/teams

Todo:

- NewsSlider (widget)

  - Will have componentWillMount(){...} to attempt to get information from database before render.

    - Need to move code to componentDidMount, as componentWillMount is listed as unsafe. Requires setting initial state in the constructor
