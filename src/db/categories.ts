import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const SubCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: mongoose.Types.ObjectId, ref: "Category" },
  },
  {
    timestamps: true,
  }
);

export const CategoryModel = mongoose.model("Category", CategorySchema);
export const SubCategoryModel = mongoose.model(
  "SubCategory",
  SubCategorySchema
);

export const getCategories = () => CategoryModel.find();

export const getCategoryByName = (name: string) =>
  CategoryModel.findOne({ name });

export const getCategoryById = (id: string) => CategoryModel.findById(id);

export const createCategory = (values: Record<string, any>) =>
  new CategoryModel(values).save().then((category) => category.toObject());

export const deleteCategoryById = (id: string) =>
  CategoryModel.findOneAndDelete({ _id: id });

export const updateCategoryById = (id: string, values: Record<string, any>) =>
  CategoryModel.findByIdAndUpdate(id, values);

export const getSubCategories = (query: Object) =>
  SubCategoryModel.find(query).populate("category");
export const getSubCategoryByName = (name: string) =>
  SubCategoryModel.findOne({ name });

export const getSubCategoryById = (id: string) => SubCategoryModel.findById(id);

export const createSubCategory = (values: Record<string, any>) =>
  new SubCategoryModel(values).save().then((category) => category.toObject());

export const deleteSubCategoryById = (id: string) =>
  SubCategoryModel.findOneAndDelete({ _id: id });

export const updateSubCategoryById = (
  id: string,
  values: Record<string, any>
) => SubCategoryModel.findByIdAndUpdate(id, values);
