const categoryService = require("../services/category.services");

const createCategory = async (req, res, next) => {
  try {
    const category = await categoryService.createCategory(
      req.body,
      req.user._id,
    );

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const getAllCategory = async (req, res, next) => {
    try{
        const result = await categoryService.getAllCategory(
            req.query
        );

        res.status(200).json({
            success:true,
            message:"Categories fetched successfully",
            data:result.categories,
            pagination : result.pagination
        })
    }catch(error){
        next(error);
    }
};

const getCategoryById = async(req,res,next) => {
    try{
        const category = await categoryService.getCategoryById(
            req.params.id
        );

        res.status(200).json({
            success:true,
            message:"Category fetched Successfully",
            data:category
        });

    }catch(error){
        next(error);
    }
}

module.exports = {
  createCategory,
  getAllCategory,
  getCategoryById 
};
