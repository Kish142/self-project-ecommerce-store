const createError = require('http-errors');
const Product = require('../models/product');
const Cloudinary = require('cloudinary').v2;

exports.createProduct = async (req, res, next) => {
  try {
    if (!req.files)
      throw createError(406, 'Please add image(s) of the product');

    if (
      !req.body.name ||
      !req.body.category ||
      !req.body.price ||
      !req.body.smallDesc ||
      !req.body.description
    )
      throw createError(406, 'Missing Fields');

    var public_id = [];

    req.files && console.log(req.files.length);

    console.log(req.body);

    for (var i = 0; i < req.files.length; i++) {
      const image = await Cloudinary.uploader.upload(req.files[i].path, {
        folder: 'products',
      });
      public_id.push(image.public_id);
    }

    console.log(public_id);

    const product = await Product.create({ ...req.body, image: public_id });
    if (!product) {
      throw createError(500, 'thorwed error');
    } else {
      console.log(product);
      return res.status(201).json({ product });
    }
  } catch (err) {
    return next(createError(err));
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const product = await Product.find();
    if (!product.length) throw createError(404, 'No Product found');
    res.status(200).json({ product });
  } catch (err) {
    return next(createError(err));
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) throw createError(404, 'No Product found in that ID');
    res.status(200).json({ product });
  } catch (err) {
    return next(createError(err));
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) throw createError(404, 'No Product found in that ID');

    // update product regards to client request

    // Delete / update and add product image
    if (req.body.public_id && req.files) {
      const delImg = req.body.public_id.split(',');

      for (var i = 0; i < delImg.length; i++) {
        const rmImage = await Cloudinary.uploader.destroy(delImg[i]);
        await product.updateOne({ $pull: { image: delImg[i] } }), { new: true };

        console.log(rmImage);
      }

      var public_id = [];
      for (var i = 0; i < req.files.length; i++) {
        const image = await Cloudinary.uploader.upload(req.files[i].path, {
          folder: 'products',
        });
        public_id.push(image.public_id);
        await product.updateOne({ $push: { image: image.public_id } }),
          { new: true };
        console.log(req.files[i]);
      }

      if (req.body) {
        await product.updateOne(req.body), { new: true };
      }

      res.status(200).json(product);
    }

    // Delete Image only
    else if (req.body.public_id && !req.files) {
      for (var i = 0; i < req.body.public_id.length; i++) {
        const rmImage = await Cloudinary.uploader.destroy(
          req.body.public_id[i]
        );
        await product.updateOne({ $pull: { image: req.body.public_id[i] } }),
          { new: true };
        console.log(rmImage);
      }

      if (req.body) {
        await product.updateOne(req.body), { new: true };
      }

      res.status(200).json(product);
    }

    // Add image only
    else if (req.files && !req.body.public_id) {
      console.log('req.fils');

      console.log(req.body.public_id);

      var public_id = [];
      for (var i = 0; i < req.files.length; i++) {
        const image = await Cloudinary.uploader.upload(req.files[i].path, {
          folder: 'products',
        });
        public_id.push(image.public_id);
        await product.updateOne({ $push: { image: image.public_id } }),
          { new: true };
      }

      if (req.body) {
        await product.updateOne(req.body), { new: true };
      }

      res.status(200).json(product);
    }

    // Update product details (only contains body)
    else {
      console.log(req.body);
      req.files && console.log(req.files);
      await product.updateOne(req.body), { new: true };
      res.status(200).json({ product });
    }
  } catch (err) {
    return next(createError(err));
  }
};

exports.deleteProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) throw createError(404, 'No Product found in that ID');

    if (product.image.length) {
      for (var i = 0; i < product.image.length; i++) {
        const image = await Cloudinary.uploader.destroy(product.image[i]);

        if (!image) throw createError(500, 'Server error...');
      }
    }

    await product.deleteOne();
    res.status(200).json({ product });
  } catch (err) {
    return next(createError(err));
  }
};

exports.deleteAllProduct = async (req, res, next) => {
  try {
    await Product.deleteMany();
    res.status(200).json({ msg: 'All Products Deleted' });
  } catch (err) {
    return next(createError(500, err));
  }
};

exports.imageUpload = async (req, res, next) => {
  try {
    var public_id = [];
    for (var i = 0; i < req.files.length; i++) {
      const image = await Cloudinary.uploader.upload(req.files[i].path, {
        folder: 'products',
      });
      public_id.push(image.public_id);
    }

    res.status(200).json(public_id);
  } catch (err) {
    return next(createError(err));
  }
};
