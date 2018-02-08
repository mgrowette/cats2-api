#CREATE
//COMPLETE
## In the api.js
- access cloudant database
- app.post() to create a new cat and append() the cats list in the `cats/` path
- create a path to handle errors using error handling middleware
- use res.status and res.send to send back status code and the results of the app.post

## In the dal.js
- db.put() to add to our database while specifying our own ID

-----------------------------------------------------------

#READ

## In the api.js
- app.get() from `/cats` => res.send(cats)
- this pulls the cats from the dal

## In the dal.js
- db.get() to pull cats from cloudant database

-----------------------------------------------------------

#UPDATE

## In the api.js
- app.put() using the `cats/:id` to update the cats list
- accept in the req.body of the cat you want to replace

## In the dal.js
- db.put() to update the list of cats in the database based on cat id
- write the code to generate our own cat ids

-----------------------------------------------------------

#DELETE

## In the api.js
- `cats/:id` will be the path to access specific cat to delete
- access cats specific id using cats.params.id
- app.delete() is the http call


## In the dal.js
- db.get() to make sure the cat they are trying to delete exists
- db.remove() to delete the cat the matches the specific id
