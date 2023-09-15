export const transformCategory = (category: Record<string, any>) => {
  return {
    categoryLevel1Id: category._id,
    categoryLevel1Name: category.name,
  };
};

export const transformSubCategory = (category: Record<string, any>) => {
  console.log(
    "🚀 ~ file: transform.ts:9 ~ transformSubCategory ~ category:",
    category
  );
  return {
    categoryLevel2Id: category._id,
    categoryLevel1Name: category.category.name,
    categoryLevel2Name: category.name,
  };
};
