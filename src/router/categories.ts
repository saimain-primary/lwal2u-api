import express from "express";

import { isAuthenticated } from "../middlewares";
import {
  deleteCategory,
  getAllCategories,
  getCategory,
  addCategory,
  updateCategory,
  getAllSubCategories,
  addSubCategory,
  deleteSubCategory,
  updateSubCategory,
} from "../controllers/categories";

export default (router: express.Router) => {
  router.get("/categories", isAuthenticated, getAllCategories);
  router.get("/categories/:id", isAuthenticated, getCategory);
  router.post("/categories", isAuthenticated, addCategory);
  router.delete("/categories/:id", isAuthenticated, deleteCategory);
  router.patch("/categories/:id", isAuthenticated, updateCategory);

  router.get("/sub-categories", isAuthenticated, getAllSubCategories);
  router.post("/sub-categories", isAuthenticated, addSubCategory);
  router.delete("/sub-categories/:id", isAuthenticated, deleteSubCategory);
  router.patch("/sub-categories/:id", isAuthenticated, updateSubCategory);
};
