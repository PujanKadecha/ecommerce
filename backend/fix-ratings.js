const mongoose = require('mongoose');
const Product = require('./models/product.model');
const Review = require('./models/review.model');

mongoose.connect('mongodb://localhost:27017/E-Commerce').then(async () => {
  try {
    const products = await Product.find();
    for (const p of products) {
      const result = await Review.aggregate([
        { $match: { product: p._id } },
        { $group: { _id: '$product', avg: { $avg: '$rating' }, count: { $sum: 1 } } }
      ]);
      if (result.length > 0) {
        await Product.findByIdAndUpdate(p._id, {
          averageRating: Number(result[0].avg.toFixed(1)),
          numReviews: result[0].count
        });
        console.log(`Updated product ${p.name} with ${result[0].count} reviews`);
      } else {
        await Product.findByIdAndUpdate(p._id, {
          averageRating: 0,
          numReviews: 0
        });
        console.log(`Updated product ${p.name} with 0 reviews`);
      }
    }
    console.log('Finished updating all product ratings!');
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
});
