import Class from "../models/classes.js";
import Teacher from "../models/teachers.js";

export const createClass = async (req, res) => {
  try {
    const { classId, className, teacherName, studentCount } = req.body;
    if (!className || !teacherName || !classId) {
      return res.status(404).json({ message: "Enter the mandatory fields" });
    }
    const teacherRecord = await Teacher.findOne({ name: teacherName });

    if (!teacherRecord) {
      return res.status(404).json({ message: "Invalid class" });
    }

    const teacherId = teacherRecord.teacherId;

    const newClass = new Class({
      name: className,
      classId: classId,
      teacherId: teacherId,
      studentCount: studentCount,
    });

    const savedClass = await newClass.save();

    res.status(201).json({ message: savedClass });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

export const getAllClasses = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const className = req.query.className; // Get className from query params

    // Initialize filter object
    let query = {};

    if (className) {
      // Lookup classId by className
      const classRecord = await Class.findOne({ name: className });

      if (!classRecord) {
        return res.status(400).json({ message: "Class not found" });
      }

      // Add classId to the query for filtering
      query.classId = classRecord.classId;
    }

    // Fetch classes with pagination and optional class filtering
    const classes = await Class.find(query)
      .skip(skip)
      .limit(limit)
      .populate("classId", "name"); // Populate classId with class name

    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getClassDetails = async (req, res) => {
  try {
    const classId = req.params.id;

    const classRecord = await Class.findById(classId);

    if (!classRecord) {
      return res
        .status(404)
        .json({ message: "Class not found. Try with valid class ID" });
    }

    res.status(200).json({ message: classRecord });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const updateClassDetails = async (req, res) => {
  try {
    const classId = req.params.id; // Get ID from the URL path

    // Check if the class exists
    const classRecord = await Class.findById(classId);
    if (!classRecord) {
      return res
        .status(404)
        .json({ message: "Class not found. Try with a valid class ID" });
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

    // Update the class using findByIdAndUpdate
    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      updateData, // update data will only contain the fields provided
      { new: true } // to return the updated document
    );

    res.status(200).json({
      message: "Class updated successfully",
      updatedClass,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const deleteClassDetails = async (req, res) => {
  try {
    const classId = req.params.id; // Get ID from the URL path

    // Check if the class exists
    const classRecord = await Class.findById(classId);
    if (!classRecord || classRecord.deleted) {
      return res.status(404).json({ message: "Class Not Found" });
    }

    // Destructure only the fields that are in the request body

    // Prepare update data, only include the fields that are provided
    await Class.findByIdAndDelete(classId);

    res.status(200).json({
      message: "Class deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
