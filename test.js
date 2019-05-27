const Cacheous = require('./index');

const Schema = Cacheous.Schema;

async function testfunction() {
  const TestingSchema = Schema({
    name: { type: String, required: true },
    dateOfBirth: { type: Date, default: Date.now() },
    data: String,
  });

  const Test = new Cacheous({
    name: 'test',
    storeURI: 'mongodb://lib1:liblib1@ds229826.mlab.com:29826/libtest',
    schema: TestingSchema,
  });

  try {
    await Test.insert({ name: 'Chris', data: 'Unknowable' });
    let list = await Test.getIdList();
    console.log(list);
    const records = await Test.getList(list);
    console.log(records);
    // process.exit();
    return records;
  } catch (error) {
    console.error(error);
  }
}

testfunction().then(records => {
  console.log(records);
});
