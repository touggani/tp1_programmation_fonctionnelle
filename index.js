import fastify from 'fastify';
// see axios doc on how to use it
import axios from 'axios';

const app = fastify({ logger: true });
var facts = {};
var fox = {};
var res = {};

function getFacts() {
  return axios.get('https://cat-fact.herokuapp.com/facts');
}

let promise1 = new Promise((resolve, reject) => {
  axios.get('https://cat-fact.herokuapp.com/facts').then(function(result) {
    return result;
  });
});


function getFox() {
  return axios.get('https://randomfox.ca/floof/');
}
function first() {
 Promise.all([getFacts(), getFox()])
  .then(function (results) {
    const acct = results[0];
    const perm = results[1]; 
    //console.log(acct['data'][1]['text']); 
    //console.log(perm['data']['image']); 
    creationJson(acct, perm);
  }); 
}

function creationJson(fact,fox){
  facts = fact;
  let companies =
    `[
       {
          "foxPicture": `+fox['data']['image']+`,
          "catFacts": [
            `+fact['data'][1]['text']+
              fact['data'][2]['text']+
              fact['data'][3]['text']+`
          ],
          "ceo": "Neil",
          "rating": 3.6
        },
        {
          "name": "Small startup",
          "numberOfEmployees": 10,
          "ceo": null,
          "rating": 4.3
       }
    ]`
    return companies;
    
}



app.get('/', async (req, res) => {
  return {
    message: `Welcome to Node Babel with ${
      req.body?.testValue ?? 'no testValue'
    }`,
  };
});

app.get('/facts',async (req, res) => {
  
    return creationJson();
    
});

// Run the server!
const start = async () => {
  try {
    await app.listen(5000);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
