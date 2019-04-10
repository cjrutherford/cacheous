# Cacheous

## A small wrapper that adds extra functionality to Keyv.

## Assumptions:

1. _You like to ensure your data is clear and fully valid._
   Schemas provide a quick way to provide validation for your data.

2. _You like your data fast, but also safe._
   Keeping data inside an in memory cache quickly allows applications to respond to requests, and using a persistent data store keeps it safe across multiple instances.

## Creating the Schema

To Create a Schema for Cacheous, use the [`schm`](https://github.com/diegohaz/schm) package from npm to define your schema as you would in Mongoose. Then the schema provided in the constructor.

Please see the documentation for [`diegohaz/schm`](https://github.com/diegohaz/schm) for how to define or extend your shcema.

## Constructor Sample

```
cosnt Cacheous = require('cacheous');
cosnt ObjectSchema = require('./schema');

const ObjectCache = new Cacheous({
    name: 'Objects',
    storeURI: 'connectionstring for supported data stores',
    schema: ObjectSchema
});
```

## Api Reference

### `getIdList(): Array<String>`

Returns the list of ID's in the model set.

### `getById(id: String): Model`

Returns a Model Object that is at the specified ID.

### `where(filter: Function): Array<Model>`

Accepts a lambda to filter the objects in the store, and returns an array of objects for which the lambda is true.

### `insert(m: Model): Model`

Accepts an object of the model, validates it against the schema, and inserts into the cache.

### `destroy(id: String): Boolean`

Accepts an ID, and removes it from the cache.
