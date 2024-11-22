import Class from "../models/classes.js";
import Student from "../models/students.js";
import { uploadToCloudinary } from "../utility/cloudinaryUtils.js";

export const addStudent = async (req, res) => {
  try {
    const { studentId, studentName, email, className, profileUrl } = req.body;

    if (!studentId || !studentName || !email || !className) {
      res.status(400).json({ message: "Please enter the mandatory fields." });
    }

    const classRecord = await Class.findOne({ name: className });

    if (!classRecord) {
      return res.status(404).json({ message: "Invalid class" });
    }

    const classId = classRecord.classId;

    const newStudent = new Student({
      name: studentName,
      studentId: studentId,
      email: email,
      classId: classId,
      profileImageUrl: profileUrl,
    });

    const savedStudent = await newStudent.save();

    res.status(201).json({ message: savedStudent });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

export const uploadStudentProfilePicture = async (req, res) => {
  try {
    console.log(req.files);
    if (!req.files || !req.files.profilePicture) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const profilePicture = req.files.profilePicture; // Access the uploaded file
    const result = await uploadToCloudinary(profilePicture.tempFilePath, {
      folder: "school/students",
    });
    console.log(result);
    res.status(200).json({
      message: "Profile picture uploaded successfully.",
      profileImageUrl: result.url, // Return the Cloudinary URL
    });
  } catch (error) {
    console.error("Error uploading student profile picture:", error);
    res.status(500).json({ message: "Failed to upload profile picture." });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const className = req.body.className; // Get className from query params
    // console.log(req.body.className); // Get className from query params
    // Initialize filter object
    let query = {};

    if (className) {
      // Lookup classId by className
      const classRecord = await Class.findOne({ name: className });
      // console.log(classRecord);
      if (!classRecord) {
        return res.status(400).json({ message: "Class not found" });
      }
      if (classRecord.length === 0) {
        return res
          .status(200)
          .json({ message: "No existing class found. Please create one." });
      }
      // Add classId to the query for filtering
      query.classId = classRecord.classId;
    } else {
      return res
        .status(400)
        .json({ message: "Please provide class name to fetch." });
    }

    // Fetch students with pagination and optional class filtering
    const students = await Student.find(query)
      .skip(skip)
      .limit(limit)
      .populate("_id", "name"); // Populate classId with class name

    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getStudentDetails = async (req, res) => {
  try {
    const studentId = req.params.id;

    const studentRecord = await Student.findById(studentId);

    if (!studentRecord) {
      return res
        .status(404)
        .json({ message: "Student not found. Try with valid student ID" });
    }

    res.status(200).json({ message: studentRecord });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateStudentDetails = async (req, res) => {
  try {
    const studentId = req.params.id; // Get ID from the URL path

    // Check if the student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return res
        .status(404)
        .json({ message: "Student not found. Try with a valid student ID" });
    }

    // Destructure only the fields that are in the request body
    const { name, email, className, profileURL, deleted } = req.body;

    // Prepare update data, only include the fields that are provided
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (className) updateData.classId = className; // Assuming className is a string and needs to be mapped to classId
    if (profileURL) updateData.profileImageUrl = profileURL;
    if (deleted) updateData.deleted = deleted;

    // Update the student using findByIdAndUpdate
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      updateData, // update data will only contain the fields provided
      { new: true } // to return the updated document
    );

    res.status(200).json({
      message: "Student updated successfully",
      updatedStudent,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteStudentDetails = async (req, res) => {
  try {
    const studentId = req.params.id; // Get ID from the URL path

    // Check if the student exists
    const student = await Student.findById(studentId);
    if (!student || student.deleted) {
      return res
        .status(404)
        .json({ message: "Student Not Found or Already Deleted" });
    }

    // Destructure only the fields that are in the request body

    // Prepare update data, only include the fields that are provided
    const updateData = {
      deleted: true,
    };

    // Update the student using findByIdAndUpdate
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      updateData, // update data will only contain the fields provided
      { new: true } // to return the updated document
    );

    res.status(200).json({
      message: "Student deleted successfully",
      updatedStudent,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
