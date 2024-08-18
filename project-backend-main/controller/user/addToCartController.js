const addToCartModel = require("../../models/cartProduct");

const addToCartController = async (req, res) => {
    try {
        // Ensure req.userId is being set properly (e.g., from a middleware)
        if (!req.userId) {
            return res.status(401).json({
                message: "Unauthorized. User ID is missing.",
                success: false,
                error: true
            });
        }

        const { productId } = req.body;
        const currentUser = req.userId;

        // Check if the product already exists in the cart
        const isProductAvailable = await addToCartModel.findOne({ productId, userId: currentUser });

        if (isProductAvailable) {
            return res.json({
                message: "Already exists in cart",
                success: false,
                error: true
            });
        }

        const payload = {
            productId,
            quantity: 1,
            userId: currentUser,
        };

        const newAddToCart = new addToCartModel(payload);
        const saveProduct = await newAddToCart.save();

        return res.json({
            data: saveProduct,
            message: "Product added to cart",
            success: true,
            error: false
        });

    } catch (err) {
        console.error('Error in addToCartController:', err);
        return res.status(500).json({
            message: err.message || 'Internal Server Error',
            error: true,
            success: false
        });
    }
};

module.exports = addToCartController;
