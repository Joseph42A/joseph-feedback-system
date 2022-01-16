const router = require("express").Router();
const formController = require("../controller/formController.js");

router.route("/form").post(formController.createForm);

router
  .route("/form/:id")
  .get(formController.getAllForm)
  .delete(formController.deleteForm);

router.route("/singleForm/:id").get(formController.getForm);

module.exports = router;
