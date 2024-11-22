import Teacher from "../models/teachers.js";
import { uploadToCloudinary } from "../utility/cloudinaryUtils.js";

export const addTeacher = async (req, res) => {
  const { teacherId, teacherName, email, subject, profileURL } = req.body;
  if (!teacherName || !email || !subject || !teacherId) {
    return res.status(404).json({ message: "Enter the mandatory fields" });
  }

  const newTeacher = new Teacher({
    teacherId: teacherId,
    name: teacherName,
    email: email,
    subject: subject,
    profileImageUrl: profileURL,
  });

  const savedTeacher = await newTeacher.save();

  res.status(201).json({ message: savedTeacher });
};
export const uploadTeacherProfilePicture = async (req, res) => {
  try {
    console.log(req.files);
    if (!req.files || !req.files.profilePicture) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const profilePicture = req.files.profilePicture; // Access the uploaded file
    const result = await uploadToCloudinary(profilePicture.tempFilePath, {
      folder: "school/teachers",
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
export const getAllTeachers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const teacherName = req.query.teacherName; // Get className from query params

    // Initialize filter object
    let query = {};

    if (teacherName) {
      // Lookup classId by className
      const teacherRecord = await Teacher.findOne({ name: teacherName });

      if (!teacherRecord) {
        return res.status(400).json({ message: "Teacher not found" });
      }

      // Add classId to the query for filtering
      query.teacherId = teacherRecord.teacherId;
    }

    // Fetch teachers with pagination and optional class filtering
    const teachers = await Teacher.find(query)
      .skip(skip)
      .limit(limit)
      .populate("classId", "name"); // Populate classId with class name

    res.status(200).json(teachers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTeacherDetails = async (req, res) => {
  try {
    const teacherId = req.params.id;

    const teacherRecord = await Teacher.findById(teacherId);

    if (!teacherRecord) {
      return res
        .status(404)
        .json({ message: "Teacher not found. Try with valid teacher ID" });
    }

    res.status(200).json({ message: teacherRecord });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTeacherDetails = async (req, res) => {
  try {
    const teacherId = req.params.id; // Get ID from the URL path

    // Check if the teacher exists
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res
        .status(404)
        .json({ message: "Teacher not found. Try with a valid teacher ID" });
    }

    // Destructure only the fields that are in the request body
    const { name, email, className, profileURL, deleted } = req.body;

    // Prepare update data, only include the fields that are provided
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (className) updateData.classId = className; // Assuming className is a string and needs to be mapped to classId
    if (profileURL) updateData.profileImageUrl = profileURL;
    if (deleted || !deleted) updateData.deleted = deleted;

    // Update the teacher using findByIdAndUpdate
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      teacherId,
      updateData, // update data will only contain the fields provided
      { new: true } // to return the updated document
    );

    res.status(200).json({
      message: "Teacher updated successfully",
      updatedTeacher,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const deleteTeacherDetails = async (req, res) => {
  try {
    const teacherId = req.params.id; // Get ID from the URL path

    // Check if the teacher exists
    const teacher = await Teacher.findById(teacherId);
    if (!teacher || teacher.deleted) {
      return res
        .status(404)
        .json({ message: "Teacher Not Found or Already Deleted" });
    }

    // Destructure only the fields that are in the request body

    // Prepare update data, only include the fields that are provided
    const updateData = {
      deleted: true,
    };

    // Update the teacher using findByIdAndUpdate
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      teacherId,
      updateData, // update data will only contain the fields provided
      { new: true } // to return the updated document
    );

    res.status(200).json({
      message: "Teacher deleted successfully",
      updatedTeacher,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
