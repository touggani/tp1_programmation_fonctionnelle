import fastify from 'fastify';
import axios from 'axios';

const app = fastify({ logger: true });




const getFacts = () =>{
  return new Promise(resolve => {axios.get('https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=3')
  .then(res => {
    let facts = [];
    let i = 0;
    while (i < res.data.length) {
      facts.push(res.data[i].text);
      i++;
    }
    resolve(facts);
  }).catch(fail => resolve(null));});
};

const getFoxImage = () =>{
  return new Promise(resolve => {
    axios.get('https://randomfox.ca/floof/')
    .then(res => {resolve(res.data.image)})
    .catch(fail => resolve(null));
  });
};

const getDays = (countryCode ) => {
  return new Promise(resolve => {
    axios.get('https://date.nager.at/api/v2/publicholidays/2021/'+countryCode)
    .then(res => {resolve(res.data)})
    .catch(fail => resolve(null));
  });
};

const getAll = () => {
  return Promise.all([getFacts(),getFoxImage(),getDays('FR')]).then(res => {
    let data = {};
    data['fox'] = res[1];
    data['cat'] = res[0];
    data['days'] = res[2];
    return data;
  });
};


app.get('/', async (req, res) => {
  return getAll();
});

app.get('/facts', async (req, res) => {
  return getFacts();
});

app.get('/fox', async (req, res) => {
  return getFoxImage();
});

const start = async () => {
  try {
    await app.listen(5000);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();