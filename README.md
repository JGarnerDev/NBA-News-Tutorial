Todo:

- Think about file structure

  Previous works were known to be disorganized; let's avoid that.

  Structure template:

  - src

    - components
      - component
        - Component.js
        - Component.module.css
    - hoc ( higher-order components )
      - Hoc
        - Hoc.js
        - Hoc.module.css
    - index.js , config.js , routes.js , etc.

- Get a mock database for demo purposes
- typicode's json-server for a fake REST API
- https://www.mockaroo.com/ for a db.json
  - populate it with references to our images and videos.

* SideNav

  To be a class-based component nested in Header, recieving props through it to be used in it's state.

  Requires state management to establish if it should be visible or not (Boolean), and two listeners to that condition for each 'opened' and 'closed' state. (layout.js)

* SideNav Items

  Functional components refactored into one component, iterates through an array of SideNav items and renders them into our SideNav.
