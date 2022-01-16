const mongoose = require("mongoose");

const formSchema = mongoose.Schema({
  formName: {
    type: String,
    required: [true, "formanem is required"],
  },
  formDesc: {
    type: String,
    required: [true, "formanem is required"],
  },
  formUserId: {
    type: String,
    required: true,
  },
  universityName: String,
  collegeName: String,
  departmentName: String,
  branchName: String,
  teachers: [
    {
      teacherName: {
        type: String,
        required: [true, "teacher name is required"],
      },
      teacherSubject: {
        type: String,
        required: [true, "teacher name is required"],
      },
      ratingAnswer: [String],
    },
  ],
  questions: [String],
  students: [
    {
      studentId: String,
      isSubmited: {
        type: Boolean,
        default: false,
      },
    },
  ], // push all student's id here
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Form = mongoose.model("Form", formSchema);
