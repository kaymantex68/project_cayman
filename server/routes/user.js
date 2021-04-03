const express = require("express");

const router = express.Router();

// import moddlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// import controllers
const {
    //create,
    list,
    read,
    //update,
    //remove,
} = require("../controllers/user");

// router.post("/work",
//     authCheck, adminCheck,
//     create)
router.post("/users",
    authCheck, adminCheck,
    list);
router.post("/user/:_id",
    authCheck, adminCheck,
    read);
// router.get("/work/:slug", read)
// router.put("/work/:_id",
//     authCheck, adminCheck,
//     update)
// router.delete("/work/:_id",
//     authCheck, adminCheck,
//     remove)

module.exports = router;
