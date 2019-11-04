const Model = require('./model');
const Schema = require('schm');

class Cacheous {
  constructor() {
    modelCache = {};
    if(!Cacheous.instance){
      Cacheous.instance = this;
    }
    return Cacheous.instance;
  }

  connect(uri){
    this.storeURI = uri;
  }

  model({name, schema}) {
    this.modelCache[name] = {
      model:  new Keyv(this.storeURI, {
        namespace: name,
      }),
      modelSchema:schema,
      errorHandler: modelCache[name].on('error', err => console.error(err))
    };
    return this.modelCache[name];
  }

 
}

Cacheous = {
  ...Cacheous,
  Schema,
  Model
};

const instance = new Cacheous();

Object.freeze(instance);

module.exports = instance;
