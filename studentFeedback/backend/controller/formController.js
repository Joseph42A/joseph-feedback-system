const Form = require("../model/form.js");

exports.getAllForm = async (req, res) => {
  const userId = req.params.id;

  try {
    const formForUser = await Form.find({ formUserId: userId });

    res.status(200).json({
      status: "success",
      result: formForUser.length,
      data: {
        formForUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.createForm = async (req, res) => {
  const {
    formName,
    formDesc,
    formUserId,
    universityName,
    collegeName,
    departmentName,
    branchName,
    teachers,
    questions,
    students,
  } = req.body;

  try {
    const newForm = await Form.create({
      formName,
      formDesc,
      formUserId,
      universityName,
      collegeName,
      departmentName,
      branchName,
      teachers,
      questions,
      students,
    });

    const { __v, ...CurrentNewForm } = newForm._doc;
    res.status(201).json({
      status: "success",
      data: {
        CurrentNewForm,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteForm = async (req, res) => {
  const formId = req.params.id;

  try {
    await Form.findByIdAndDelete(formId);

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getForm = async (req, res) => {
  const formId = req.params.id;

  try {
    const form = await Form.findById(formId);

    res.status(200).json({
      status: "success",
      data: {
        form,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
