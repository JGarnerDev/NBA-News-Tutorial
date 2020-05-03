This app is a project aided and taught by Tutsgalaxy's React Fullstack Course (2018)

- Startup console commands

  - npm start

* File structure

  Previous works were known to be disorganized; let's avoid that.

  - src
    - Components (views/widgets/HOC)
      - Component
        - Component.js
        - Component.module.css

Todo:

- ComponentDidMount instead of ComponentWillMount advocated, do some research into why

- VideosRelated links broken

- [FIXED] stateToHTML(convertedContent) in Dashboard.js throws 'this.contentState.getBlocksAsArray is not a function' error.

  The issue was that during state conversion (taking the input from the text area and storing it for submission), the buggy code was saving 'block' objects rather than JS strings of HTML. As such, the post[body] key would have a value of something entirely undigestable by our templates.

  So, rather than ( Dashboard.js / line 186 ):

        let stateContent = editorState.getCurrentContent();

        let convertedContent = convertToRaw(stateContent);

        let contentInHTML = stateToHTML(convertedContent);

        this.updateForm({ id: "body" }, contentInHTML);

  This did the trick:

        let contentInHTML = stateToHTML(editorState.getCurrentContent());

        this.updateForm({ id: "body" }, contentInHTML);
