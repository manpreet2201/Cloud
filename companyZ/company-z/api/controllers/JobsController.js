/**
 * JobsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const axios = require('axios');

module.exports = {

  list: function(req, res) {
    // axios.get('http://companyx-env.eba-azstb5mp.us-east-1.elasticbeanstalk.com/API735/getJobs')
    // .then(response => {
    //     console.log(response);
    //     // res.send(response.data);
    //     res.view('pages/list', {jobs: response.data})
    // })
    // .catch(error => {
    //     console.log(error);
    // });
    let data = [{"id":"job383","partId":383,"qty":33},
      {"id":"job383","partId":384,"qty":35},
      {"id":"job541","partId":541,"qty":55},
      {"id":"job691","partId":691,"qty":66},
      {"id":"job705","partId":705,"qty":78},
      {"id":"job735","partId":735,"qty":77},
      {"id":"job930","partId":930,"qty":99}];
    res.view('pages/list', {jobs: data});
  },

  parts: function(req, res) {
    let jobName = req.params.jobName;
    // let parts = {"partId": [383, 384]};
    // axios.post('http://129.173.67.218:1337/viewParts', parts)
    // .then(response => {
    //     console.log(response);
    //     // res.send(response.data);
    //     res.view('pages/parts', {parts: response.data, jobName: jobName});
    // })
    // .catch(error => {
    //     console.log(error);
    // });
    let data = [{"partid":383,"partName":"mouse","qoh":30},
      {"partid":384,"partName":"printer","qoh":20}];
    res.view('pages/parts', {parts: data, jobName: jobName});
  },

  validate: async function (req, res) {
    var job = await Users.findOne({id:req.body.username, password:req.body.password}).intercept((err)=>{
      err.message = 'Uh oh: '+err.message;
      return res.status(400).send(err.message);
    });
    if(job === undefined){
      res.status(404).send('Invalid Credentials');
      // res.view('pages/order', {message: 'Invalid Credentials'});
    }
    else{
      res.status(200).send('Valid Credentials');
      // res.view('pages/order', {message: 'Order Successful'});
    }
  },
  // validate: function(req, res) {
  //   var user = Users.findOne({id:req.body.username, password:req.body.password});
  //   if(user === undefined){
  //     res.status(404).send('Invalid User');
  //   }
  //   else{
  //     res.status(200).send(user);
  //   }
  // },
};
