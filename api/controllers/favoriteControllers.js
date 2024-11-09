const Favorite = require("../models/Favorite");
// Get all favorites for a user by email
const getFavoritesByEmail = async (req, res) => {
    try {
        const email = req.query.email;
        const favorites = await Favorite.findOne({ email }).exec();
        res.status(200).json(favorites);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a product to favorites
const addToFavorites = async (req, res) => {
    const { menuId, name, image, price, email } = req.body;
    try {
        // Check if user has a favorites list
        let favoriteList = await Favorite.findOne({ email });

        // If no list exists, create a new one
        if (!favoriteList) {
            favoriteList = await Favorite.create({
                email,
                menus: [{ menuId, name, image, price }]
            });
        } else {
            // Ensure both IDs are strings for comparison
            const existingProduct = favoriteList.menus.find(
                (product) => product.menuId.toString() === menuId.toString()
            );

            if (existingProduct) {
                return res.status(400).json({ message: "Product already in favorites!" });
            }

            // Add product to existing favorites list
            favoriteList.menus.push({ menuId, name, image, price });
            await favoriteList.save();
        }

        res.status(201).json(favoriteList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Delete a favorite item
const deleteFavorite = async (req, res) => {
    const { favoriteId, menuId } = req.params;
    try {
        const updatedFavorite = await Favorite.findByIdAndUpdate(
            favoriteId,
            { $pull: { menus: { _id: menuId } } },
            { new: true }
        );

        if (!updatedFavorite) {
            return res.status(404).json({ message: "Favorite list or product not found!" });
        }

        res.status(200).json({ message: "Product removed from favorites successfully!", updatedFavorite });
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
};



module.exports = {
    getFavoritesByEmail,
    addToFavorites,
    deleteFavorite,
};
