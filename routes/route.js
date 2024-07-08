import express from "express";
import { AdminLogin, Adminreg, Login, Register, } from "../controller/auth.js";
import { AddCompaney, accepBids, deleteBids, getJob, getallJob } from "../controller/companey.js";
import { ApliedJob, getApplied, getApplieds } from "../controller/Appliedjob.js";



const route = express();

route.post('/user/register',  Register);
route.post('/user/admin', Adminreg);
route.post('/user/login', Login);
route.post('/user/adminlogin', AdminLogin);
route.post('/user/addjob/:id', AddCompaney);
route.get('/user/alljob', getJob);
route.get('/user/getalljob', getallJob);
route.post('/user/apply/:iid/:jid', ApliedJob);
route.get('/user/appliedJobs/:iid', getApplied);
route.get('/user/accepbid/:id', accepBids);
route.delete('/user/deleteBids/:id', deleteBids);
route.get('/user/appliedJobsAll', getApplieds);



export default route