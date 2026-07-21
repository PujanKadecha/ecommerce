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

const cancelOrder = async(req,res,next) => {
    try{
        const order = await orderServices.cancelOrder(req.user._id,req.params.id);

        res.status(200).json({
            success:true,
            message:"Order Canceled Successfully",
            data:order
        });
    }catch(error){
        next(error);
    }
}

module.exports = {
  placeOrder,
  getOrders,
  getOrderById,
  cancelOrder
};
