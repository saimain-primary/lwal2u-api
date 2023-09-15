import express from "express";

import {
  deleteCategoryById,
  getCategories,
  getCategoryById,
  createCategory,
  getSubCategories,
  deleteSubCategoryById,
  getSubCategoryById,
  createSubCategory,
} from "../db/categories";
import { transformCategory, transformSubCategory } from "../helpers/transform";

export const getAllCategories = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const categories = await getCategories();
    return res.status(200).json(categories.map(transformCategory));
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getCategory = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const category = await getCategoryById(id);
    return res.status(200).json(category);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteCategory = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const deletedCategory = await deleteCategoryById(id);
    return res.json(deletedCategory);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateCategory = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
      return res.sendStatus(400);
    }

    const category = await getCategoryById(id);
    category.name = name;
    await category.save();
    return res.status(200).json(category).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const addCategory = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.sendStatus(400);
    }

    const category = await createCategory({ name });
    return res.status(200).json(category).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getAllSubCategories = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    interface FilterObjType {
      category?: string; // This denotes category as an optional property of type string.
    }

    const cId = req.query.category_id as string;
    const filter: FilterObjType = {};
    if (cId) {
      filter.category = cId;
    }
    const subCategories = await getSubCategories(filter);
    console.log("🚀 ~ file: categories.ts:102 ~ subCategories:", subCategories);
    return res.status(200).json(subCategories.map(transformSubCategory));
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteSubCategory = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const deletedCategory = await deleteSubCategoryById(id);
    return res.json(deletedCategory);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateSubCategory = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { name, category_id } = req.body;
    if (!name || !category_id) {
      return res.sendStatus(400);
    }

    const category = await getSubCategoryById(id);
    category.name = name;
    const findCategory = await getCategoryById(category_id);
    if (!findCategory) {
      return res.sendStatus(400);
    }
    category.category = category_id;
    await category.save();
    return res.status(200).json(category).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const addSubCategory = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name, category_id } = req.body;
    if (!name || !category_id) {
      return res.sendStatus(400);
    }
    const findCategory = await getCategoryById(category_id);
    if (!findCategory) {
      return res.sendStatus(400);
    }
    const category = await createSubCategory({ name, category: findCategory });
    return res.status(200).json(category).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
