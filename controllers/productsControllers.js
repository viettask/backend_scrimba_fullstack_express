import { getDBConnection } from '../db/db.js'

export async function getGenres(req, res) {

  /*
  Challenge 3:
  
  1. Get all distinct genres (no repeats) from the products table.
  
    - Our front end code is expecting an array of genres as strings, but you will likely get an array of objects from the database. Find a solution to that!
  
  2. Serve the array of genres and open up the mini browser to check the dropdown is populated.
  
  hint.md for help  
  */
  try {

    const db = await getDBConnection()

    const genreRows = await db.all('SELECT DISTINCT genre FROM products')
    const genres = genreRows.map(row => row.genre)
    res.json(genres)

  } catch (err) {

    res.status(500).json({ error: 'Failed to fetch genres', details: err.message })

  }


}

export async function getProducts(req, res) {

  try {


   const db = await getDBConnection()

    let query = 'SELECT * FROM products'
    let params = []

    const { genre, search } = req.query

    if (genre) {

      query += ' WHERE genre = ?'
      params.push(genre)

    } else if (search) {

      query += ' WHERE title LIKE ? OR artist LIKE ? OR genre LIKE ?'
      const searchPattern = `%${search}%`
      params.push(searchPattern, searchPattern, searchPattern)
      
    }
/*
Challenge 6:

1. When the user inputs text into the search box, that text will be passed to the server as a query string. We should serve products where the search text finds a match with the title, artist, or genre. We are accepting partial matching queries, so "lo" would match with "block" and "slow" and "allow".

hint.md for help!

Example incoming query: '?search=lo'
*/


    const products = await db.all(query, params)
    /*
Challenge 5:
1. Detect if a query string ‘genre’ is used. 
   If it is, retrieve only products with that genre from the database and serve them. 
   If not, all products should be served.

hint.md for help

Example incoming query: '?genre=rock'
*/

    res.json(products)

    /*
    Challenge 4:
    1. Write logic in getProducts() so all products display on page load.
       
       As we will need to modify it in the next challenge, store the SQL query in a let and pass it into the all() method.
    */



  } catch (err) {

    res.status(500).json({ error: 'Failed to fetch products', details: err.message })

  }

}