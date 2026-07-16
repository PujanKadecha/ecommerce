const adminService = require("../services/admin.services");

const getAllUsers = async (req,resizeBy,next) => {
    try{
        const result = await adminService.getAllUsers(req.query);

        res.status(200).json({
            success:true,
            message:"User Fetched successfully",
            data:result.users,
            pagination:result.pagination
        });
    }catch(error){
        next(error);
    }
}

module.exports = {getAllUsers};