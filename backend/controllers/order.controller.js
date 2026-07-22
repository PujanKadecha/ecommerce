const orderServices = require("../services/order.services");

const placeOrder = async (req, res, next) => {
  try {
    const order = await orderServices.placeOrder(req.user._id, req.body);

    res.status(200).json({
      success: true,
      message: "Order Placed Successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const order = await orderServices.getOrders(req.user._id);

    res.status(200).json({
      success: true,
      message: "Order fatched Successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const order = await orderServices.getOrderById(req.user._id, req.params.id);

    res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

const cancelOrder = async (req, res, next) => {
  try {
    const order = await orderServices.cancelOrder(req.user._id, req.params.id);

    res.status(200).json({
      success: true,
      message: "Order Canceled Successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    const result = await orderServices.getAllOrders(req.query);
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: result.orders,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

const getAdminOrderById = async (req, res, next) => {
  try {
    const order = await orderServices.getAdminOrderById(req.params.id);

    res.status(200).json({
      success: true,
      message: "Get Order By Id",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const order = await orderServices.updateOrderStatus(
      req.params.id,
      req.body.orderStatus,
    );

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

const getDashboardStatistics = async(req,res,next) => {
    try{
        const dashboard = await orderServices.getDashboardStatistics();

        res.status(200).json({
            success:true,
            message:"Dashboard fetched Successfully",
            data:dashboard
        })
    }catch(error){
        next(error);
    }
}

module.exports = {
  placeOrder,
  getOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  getAdminOrderById,
  updateOrderStatus,
  getDashboardStatistics
};
