const axios = require('axios');
module.exports = {

    getJobs: async function(req, res) {
        let jobs735 = await jobsModel.find();
        let jobsArr = [];
        jobs735 = jobs735.filter(job => {
            if(jobsArr.includes(job.id)) {
                return false;
            } else {
                jobsArr.push(job.id);
                return true;
            }
        });
        res.send (jobs735);
    },
    getJobByID: async function(req, res){
        const jobid = req.params.jobid;
        const partid = parseInt(req.params.partid);
        let jobInfo = await jobsModel.findOne({id: jobid, partId: partid});
        console.log (`jobinfo:${jobInfo}`);
        if(!jobInfo) {
            res.status (404).send(`Job with given jobId:${jobid} and partId:${partid} not found...`);
        } else {
            res.send(jobInfo);
        }
    },
    getJobByJobName: async function(req, res){
        const jobid = req.params.jobid;
        let jobInfo = await jobsModel.find({id: jobid});
        console.log (`jobinfo:${jobInfo}`);
        if(jobInfo.length == 0) {
            res.status (404).send(`Job with given jobId:${jobid} not found...`);
        } else {
            res.send(jobInfo);
        }
    },
    searchOrders: async function(req, res){
        const jobid = req.body.jobId;
        let ordersInfo = await partModel.find({jobName: jobid});        
        if(ordersInfo.length == 0){
            res.send(`Orders with given jobName:${jobid} not found...`);
        }
        else {
            res.view("pages/ordersInfo",{ordersInfo});
        }
    },
    createJob: async function(req, res) {
        if (req.body && req.body.jobId && req.body.partId && req.body.qty) {
            const jobid = req.body.jobId;
            const partid = parseInt(req.body.partId);
            const qty = parseInt(req.body.qty);
            let jobInfo = await jobsModel.findOne({id: jobid, partId: partid});
            let partExists = false;
            console.log(jobid + " "+ partid);
            console.log (`jobinfo:${jobInfo}`);
            axios.post('http://129.173.67.223:3000/parts541/partExists', {
                partId: req.body.partId
              })
              .then(async (response) =>{
                if (response.status == 404){
                    partExists = false;
                }
                if (response.status == 200){
                    partExists = true;
                }
                if (response.data.success) {
                    partExists = true;
                }
            if(!jobInfo && partExists) {
              await jobsModel.create({
                id: jobid,
                partId: partid,
                qty
            });
              res.send(`New job with jobId:${jobid} and partId:${partid} created successfully`);
            } else {
              res.status (404).send(`Job with given jobId:${jobid}  and partId:${partid} already exists`);
            }
        }) .catch(error => {
            console.log(error);
            partExists = false;   
            res.status (404).send(`Part with partId:${partid} does not exist!`); 
          }); 
     } else {
            res.status(404).send(`Parameters missing in request body!`);
        }
    },
    createPartOrder: async function(req, res) {
        partOrderArray = [];
        req.body.forEach(async element => {
            const userid = element.userId;
            const jobName = element.jobName;
            const partid = parseInt(element.partId);
            const qty = parseInt(element.qty);
            if (element.jobName && element.userId && element.partId && element.qty) {
                let jobInfo = await partModel.findOne({id: userid, partId: partid,jobName:jobName});
                if(!jobInfo) {
                    await partModel.create({
                        id: userid,
                        jobName:jobName,
                        partId: partid,
                        qty
                    });
                    console.log(partOrderArray);
                } else {
                    res.status(404).send(`Part orders not added as it exists already!!`);
                }
            }
        });
        res.send('Parts added successfully!!')
    },
    updateJob: async function(req, res) {
        if (req.body && req.body.jobId && req.body.partId && req.body.qty) {
            const jobid = req.body.jobId;
            const partid = parseInt(req.body.partId);
            const qty = parseInt(req.body.qty);
            let jobInfo = await jobsModel.findOne({id: jobid, partId: partid});
            console.log (`jobinfo:${jobInfo}`);
            if(jobInfo) {
                await jobsModel.update({id: jobid, partId: partid}).set({
                    qty:qty
                });
                res.send(`Quantity with jobId:${jobid} and partId:${partid} updated successfully!`);
            } else {
              res.status (404).send(`Job with given with jobId:${jobid} and partId:${partid} does not exist!`);
            }
        } else {
            res.status(404).send(`Parameters missing in request body!`);
        }
    },

  editJob: async function (req, res) {
    const jobid = req.params.jobid;
    const partid = parseInt(req.params.partId);
      let jobsinfo=await jobsModel.find({id:jobid,partId:partid});
      if(jobsinfo){
          res.view("pages/edit",{id:jobid,partId:partid});
      } else {
        res.send('job not found');
      }
  },
  deleteData: async function (req, res) {
    const jobid = req.params.jobId;
    const partid = req.params.partId;
    let jobInfo = await jobsModel.findOne({id: jobid, partId: partid});
    
        if(jobInfo) {
          await jobsModel.destroy({
              id: jobid, partId: partid
        
          });
          let jobs735 = await jobsModel.find();
          res.view("pages/viewData", {jobs735:jobs735});
      }
      else {
          res.send('job not found');
        }
  },



  updateData: async function (req, res) {
    const jobid = req.params.jobid;
    const partid = parseInt(req.params.partId);
    const qty=parseInt(req.body.qty);
    let jobsinfo=await jobsModel.findOne({id:jobid,partId:partid});
     if(jobsinfo){
      await jobsModel.update({id: jobid, partId: partid}).set({
            qty:qty
        });
        let jobs735 = await jobsModel.find();
        res.view("pages/viewData", {jobs735:jobs735});
    }
    else {
        res.send('job not found');
      }
  
},

    viewData: async function(req, res) {
        let jobs735 = await jobsModel.find();
        if(!jobs735) {
            res.send("Cannot find anything to show!");
        }
        if(jobs735) {
            res.view("pages/viewData", {jobs735:jobs735});
        }
    },
    addData: async function(req, res) {
        const jobid = req.body.jobId;
        const partid = parseInt(req.body.partId);
        const qty = parseInt(req.body.qty);
        let partExists = false;
        let jobInfo = await jobsModel.findOne({id: jobid, partId: partid});
        axios.post('http://129.173.67.223:3000/parts541/partExists', {
            partId: req.body.partId
          })
          .then(async (response) =>{
            if (response.status == 404){
                partExists = false;
            }
            if (response.status == 200){
                partExists = true;
            }
            if (response.data.success) {
                partExists = true;
            }
            if(partExists) {
                if(!jobInfo) {
                    await jobsModel.create({
                        id: jobid,
                        partId: partid,
                        qty
                    });
                res.redirect("/viewData");
                } else {
                    res.status (404).send(`Job with given jobId:${jobid}  and partId:${partid} already exists`);
                }
            } else {
                res.status (404).send(`Part with partId:${partid} does not exist!`);
            }
            console.log("response:" + response.status);
            console.log(response.data);
          })
          .catch(error => {
            console.log(error);
            partExists = false;   
            res.status (404).send(`Part with partId:${partid} does not exist!`); 
          });  
    },
deleteJob: async function(req, res){
    if (req.body && req.body.jobId && req.body.partId ) {
      const jobid = req.body.jobId;
      const partid = req.body.partId;
      let jobInfo = await jobsModel.findOne({id: jobid, partId: partid});
      
          if(jobInfo) {
            await jobsModel.destroy({
                id: jobid, partId: partid
          
            });
            res.send(`Quantity with jobId:${jobid} and partId:${partid} deleted successfully!`);
        } else {
          res.status (404).send(`Job with given with jobId:${jobid} and partId:${partid} does not exist!`);
        }
    } else {
        res.status(404).send(`Parameters missing in request body!`);
    }
}
}

