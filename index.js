const Keyv = require('keyv');
const uuid = require('uuid');

class Cacheous {
  constructor({ name, storeURI, schema }) {
    this.modelCache = new Keyv(storeURI, {
      namespace: name,
    });
    this.modelSchema = schema;
    this.modelCache.on('error', err => console.error(err));
  }

  async initIdList() {
    try {
      await this.modelCache.set('idList', []);
    } catch (e) {
      throw new Error(e);
    }
  }

  async validate(model) {
    try {
      const res = await this.modelSchema.validate(model);
      return res;
    } catch (e) {
      throw new Error(e[0]);
    }
  }

  async getIdList() {
    try {
      const list = await this.modelCache.get('idList');
      if (list === undefined) {
        this.initIdList();
        return await this.modelCache.get('idList');
      } else {
        return list;
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  async addToIdList(id) {
    try {
      const list = await this.getIdList();
      if (list.indexOf(id) === -1) {
        await this.modelCache.set('idList', [...list, id]);
      }
      return;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getById(id) {
    try {
      return await this.modelCache.get(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  async where(fnfilter) {
    try {
      const idList = await this.getIdList();
      const schemaList = idList
        .forEach(async id => {
          try {
            return await getById(id);
          } catch (e) {
            throw new Error(e);
          }
        })
        .filter(fnFilter);
      return schemaList;
    } catch (e) {
      throw new Error(e);
    }
  }

  async insert(s) {
    try {
      s.id = s.id === undefined ? uuid.v4() : s.id;
      const result = await this.validate(s);
      await this.modelCache.set(result.id, result);
      await this.addToIdList(result.id);
      return result;
    } catch (e) {
      throw new Error(e);
    }
  }

  async destroy(id) {
    try {
      const list = await this.getIdList();
      await this.modelCache.set('idList', list.filter(x => x !== id));
      await this.modelCache.delete(id);
      return true;
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = Cacheous;
