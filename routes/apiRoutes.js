import express from "express";
import {
  addStudent,
  getAllStudents,
  getStudentDetails,
  updateStudentDetails,
  deleteStudentDetails,
  uploadStudentProfilePicture,
} from "../controllers/studentControllers.js";
import {
  addTeacher,
  deleteTeacherDetails,
  getAllTeachers,
  getTeacherDetails,
  updateTeacherDetails,
  uploadTeacherProfilePicture,
  // getAllTeachers
} from "../controllers/teacherControllers.js";
import {
  createClass,
  getAllClasses,
  getClassDetails,
  deleteClassDetails,
  updateClassDetails,
} from "../controllers/classControllers.js";
import { login } from "../controllers/login.js";
import { authenticateUser } from "../middleware/authenticate.js";
import { isAdmin } from "../middleware/permission.js";

const router = express.Router();

// Student routes
router.post("/students", authenticateUser, isAdmin, addStudent);
router.get("/students", authenticateUser, isAdmin, getAllStudents);
router.get("/students/:id", authenticateUser, isAdmin, getStudentDetails);
router.patch("/students/:id", authenticateUser, isAdmin, updateStudentDetails);
router.delete("/students/:id", authenticateUser, isAdmin, deleteStudentDetails);
router.post(
  "/students/profile",
  authenticateUser,
  isAdmin,
  uploadStudentProfilePicture
);

// Teacher routes
router.post("/teachers", authenticateUser, isAdmin, addTeacher);
router.get("/teachers", authenticateUser, isAdmin, getAllTeachers);
router.get("/teachers/:id", authenticateUser, isAdmin, getTeacherDetails);
router.patch("/teachers/:id", authenticateUser, isAdmin, updateTeacherDetails);
router.delete("/teachers/:id", authenticateUser, isAdmin, deleteTeacherDetails);
router.post("/teachers/profile", authenticateUser, isAdmin, uploadTeacherProfilePicture);

// Class routes
router.post("/classes", authenticateUser, isAdmin, createClass);
router.get("/classes", authenticateUser, isAdmin, getAllClasses);
router.get("/classes/:id", authenticateUser, isAdmin, getClassDetails);
router.patch("/classes/:id", authenticateUser, isAdmin, updateClassDetails);
router.delete("/classes/:id", authenticateUser, isAdmin, deleteClassDetails);

// Login routes
router.post("/login", login);

export default router;
