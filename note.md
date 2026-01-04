1. Functionality:

Serve all assets
Display all products from a database
Display a selection of products based on user requirements.

2. We will be studying
    Middleware
    Serving static files
    Creating a database
    Seeding a database
    Retrieving from a database
    SQl queries and binding

3. Why SQLite is cool
    Zero setup - no server needed.
    Lightweight and fast
    Cross-platform
    Uses standard SQL syntax

4. MiddleWare
    Enabling CORS
    Parsing requests
    Logging requests/errors
    And many more uses.
    
5. Custom vs Built-in vs 3rd Party
    Custom: Built by us, specific to our use-case
    Built-in: Provided by Express
    3rd Party: Available as an NPM dependency

6. 2 Routes
    /api/products
        All products
        Products by genre
        Products by search term

    /api/products/genres
        populate the genres list for the dropdown

7. SQLite database
    npm install sqlite3  -> The database driver
    npm install sqlite  -> A wrapper

    The database driver
        opens a connection to the database file
        executes SQL queries
        Handles reading adn writing results
    
    A wrapper
        Provides async/await support for cleaner code

8. Useful sqlite3 methods
    1. db.exec() 
        You want to run multiple statements at once
        Typical use: Schema setup
        Ex:
            await db.exec(`
            CREATE TABLE products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                type TEXT NOT NULL,
                size TEXT NOT NULL
            )
            `)
        
    2. db.run()
        You want to run a single statement
        typical uses are inserting, updating, deleting
        Ex: 
            db.run(`
            INSERT INTO users(name, email) VALUES(?,?)
            `,[name,email])

    ==> Neither db.exec() or db.run() return any data

    3. db.get()
        used when you expect one row back(or you only care about the first row).
        Typical use: lookup one row by id
        Ex:
            db.get(`SELECT * FROM users WHERE id=?`,[id])

    4. db.all()
        You want all matching rows from a table as an array
        Typical use: select all in-stock products
        Ex:
            db.all(
                `
                SELECT * FROM products WHERE status=?
                `,['in-stock']
            )

9. getProducts() needs to be able to 
    serve all products
    Serve the products in a provided genre
    serve products whose title, artist, or genre contain a provided search query.

10. We will be studing
    express.session middleware
    validation
    hashing and bcrypt
    protecting routes

11. The sign up steps
    1. Create a route for the api/auth/register endpoint
    2. Validate & sanitise the incoming user data
    3. Add new user data to the users table
    4. Think about the password security in the database
    5. Create a session for the user

12. Validate incoming data
    Frontend validation is for UX only. It can easily be overridden by a malcious actor.

    We have to take care of validation on the backend

13. Validation:
    1. Check all fields exist
    2. Trim the whitespace from start and end
    3. Use regex on the username (but not the name!)
    4. Validate the email address

14. npm package : validator

15. Hashing with bcrypt
    poeple often reuse passwords, hackers might get access to:
        Email accounts
        banking apps
        Social media
        Ecommerce sites

    Hashing is the process of transforming data into a fixed-length, irreversible string of characters that uniquely represents the original input.

    We hash a password into a fixed-length string can not be decoded.

16. Hash + salt
    create a salt, a random string like a uuid
    combines salt and password
    runs the hash algorithm 
    outcome: a super unique string

17. Signup and login flow

18. Flow: signup
    User provides password

    bcrypt:
        generate random salt
        hashes password + salt
        
    hashed and salted password stored in database

19. Flow: login
    User inputs password

    Original password hash retrieved from database

    Bcrypt: 
        takes salt from original password, adds it to the new incoming password & hashes it
        compares new hash to original hash in database.

    If they match, user is signed in. If not, sign in fails.

20. express-session
    HTTP is stateless, meaning each request from a client to a server is independent and contains no knowledge of previous interactiions.
    The express-session package provides a way to store user-specific data, such as login state, between HTTP requests.

    Login flow
        User submits credentials -> Server authenticate user
        -> Session is created or updated
        -> Session id is sent to client
        -> client stores session id and sends with all requests
        -> server restores session on each request
        -> user is now logged in
        
21. cartController.js
    Write 5 functions to handle routes
        getAll
        addToCart
        deleteAll
        deleteItem
        getCount