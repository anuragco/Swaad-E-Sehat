const express = require("express");
const router = express.Router();
const pool = require("../Config/db");

router.get("/api/admin/products", async (req, res) => {
  try {
    const [products] = await pool.query(`
      SELECT 
        p.id, p.name, p.stock, p.status,
        (SELECT MIN(v.price) FROM product_variants v WHERE v.product_id = p.id) as base_price
      FROM products p
      ORDER BY p.id DESC
    `);
    res.json({ success: true, data: products });
  } catch (err) {
    console.error("Error fetching admin products:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


router.get("/api/admin/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    const [productRows] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
    if (productRows.length === 0) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    
    const [variants] = await pool.query("SELECT * FROM product_variants WHERE product_id = ?", [id]);
    
    const productData = {
      ...productRows[0],
      variants: variants
    };
    
    const cleanData = {
      ...productData,
      images: JSON.parse(productData.images || '[]'),
      ingredients: JSON.parse(productData.ingredients || '[]'),
      benefits: JSON.parse(productData.benefits || '[]'),
      nutritionalInfo: JSON.parse(productData.nutritionalInfo || '{}'),
      tags: JSON.parse(productData.tags || '[]')
    };

    res.json({ success: true, data: cleanData });
    
  } catch (err) {
    console.error("Error fetching single admin product:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


router.post("/api/admin/products", async (req, res) => {
  const { product, variants } = req.body;
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const productQuery = `
      INSERT INTO products (name, slug, detailedDescription, category, subcategory, rating, reviews, isNew, isBestSeller, isFeatured, stock, images, ingredients, benefits, nutritionalInfo, shelfLife, storageInstructions, tags, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [productResult] = await connection.query(productQuery, [
      product.name, product.slug, product.detailedDescription, product.category, product.subcategory,
      product.rating || 4.5, product.reviews || 0, product.isNew || 0, product.isBestSeller || 0,
      product.isFeatured || 0, product.stock || 0, JSON.stringify(product.images),
      JSON.stringify(product.ingredients), JSON.stringify(product.benefits),
      JSON.stringify(product.nutritionalInfo), product.shelfLife, product.storageInstructions,
      JSON.stringify(product.tags), product.status || 'active'
    ]);
    
    const newProductId = productResult.insertId;

    for (const variant of variants) {
      const variantQuery = `
        INSERT INTO product_variants (product_id, variant_id_str, name, price, originalPrice, stock, weight)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      await connection.query(variantQuery, [
        newProductId, variant.variant_id_str, variant.name, variant.price,
        variant.originalPrice, variant.stock, variant.weight
      ]);
    }

    await connection.commit();
    res.status(201).json({ success: true, message: "Product created successfully", id: newProductId });

  } catch (err) {
    if (connection) await connection.rollback();
    console.error("Error creating product:", err);
    res.status(500).json({ success: false, message: "Failed to create product", error: err.message });
  } finally {
    if (connection) connection.release();
  }
});

router.put("/api/admin/products/:id", async (req, res) => {
  const { id } = req.params;
  const { product, variants } = req.body;
  let connection;
  
  try {
    // Validation: Check if required data exists
    if (!product) {
      return res.status(400).json({ 
        success: false, 
        message: "Product data is required",
        error: "Missing 'product' in request body"
      });
    }

    if (!variants || !Array.isArray(variants)) {
      return res.status(400).json({ 
        success: false, 
        message: "Variants array is required",
        error: "Missing or invalid 'variants' in request body"
      });
    }

    // Validation: Check if product ID is valid
    if (!id || isNaN(id)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid product ID",
        error: `Product ID '${id}' is not a valid number`
      });
    }

    connection = await pool.getConnection();
    await connection.beginTransaction();

    // Check if product exists
    const [existingProduct] = await connection.query(
      "SELECT id FROM products WHERE id = ?", 
      [id]
    );
    
    if (!existingProduct || existingProduct.length === 0) {
      await connection.rollback();
      return res.status(404).json({ 
        success: false, 
        message: "Product not found",
        error: `No product exists with ID: ${id}`
      });
    }

    // Update product
    const productQuery = `
      UPDATE products SET 
      name = ?, slug = ?, detailedDescription = ?, category = ?, subcategory = ?, rating = ?, 
      reviews = ?, isNew = ?, isBestSeller = ?, isFeatured = ?, stock = ?, images = ?, 
      ingredients = ?, benefits = ?, nutritionalInfo = ?, shelfLife = ?, 
      storageInstructions = ?, tags = ?, status = ?
      WHERE id = ?
    `;
    
    const [updateResult] = await connection.query(productQuery, [
      product.name, 
      product.slug, 
      product.detailedDescription, 
      product.category, 
      product.subcategory,
      product.rating, 
      product.reviews, 
      product.isNew, 
      product.isBestSeller, 
      product.isFeatured,
      product.stock, 
      JSON.stringify(product.images || []), 
      JSON.stringify(product.ingredients || []),
      JSON.stringify(product.benefits || []), 
      JSON.stringify(product.nutritionalInfo || {}), 
      product.shelfLife,
      product.storageInstructions, 
      JSON.stringify(product.tags || []), 
      product.status, 
      id
    ]);

    // Check if update actually modified any rows
    if (updateResult.affectedRows === 0) {
      await connection.rollback();
      return res.status(400).json({ 
        success: false, 
        message: "Product update failed",
        error: "No rows were updated. Product may not exist or data is identical."
      });
    }

    // Delete old variants
    await connection.query("DELETE FROM product_variants WHERE product_id = ?", [id]);

    // Insert new variants with validation
    if (variants.length === 0) {
      await connection.rollback();
      return res.status(400).json({ 
        success: false, 
        message: "At least one variant is required",
        error: "Variants array cannot be empty"
      });
    }

    for (let i = 0; i < variants.length; i++) {
      const variant = variants[i];
      
      // Validate each variant has required fields
      if (!variant.variant_id_str || !variant.name) {
        await connection.rollback();
        return res.status(400).json({ 
          success: false, 
          message: `Invalid variant at index ${i}`,
          error: `Variant must have 'variant_id_str' and 'name'. Received: ${JSON.stringify(variant)}`
        });
      }

      const variantQuery = `
        INSERT INTO product_variants (product_id, variant_id_str, name, price, originalPrice, stock, weight)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      
      try {
        await connection.query(variantQuery, [
          id, 
          variant.variant_id_str, 
          variant.name, 
          variant.price || 0,
          variant.originalPrice || 0, 
          variant.stock || 0, 
          variant.weight || null
        ]);
      } catch (variantErr) {
        await connection.rollback();
        return res.status(500).json({ 
          success: false, 
          message: `Failed to insert variant at index ${i}`,
          error: variantErr.message,
          variant: variant
        });
      }
    }

    await connection.commit();
    res.json({ 
      success: true, 
      message: "Product updated successfully",
      productId: id,
      variantsUpdated: variants.length
    });

  } catch (err) {
    if (connection) {
      try {
        await connection.rollback();
      } catch (rollbackErr) {
        console.error("Rollback error:", rollbackErr);
      }
    }
    
    console.error("Error updating product:", {
      productId: id,
      error: err.message,
      stack: err.stack,
      body: req.body
    });
    
    res.status(500).json({ 
      success: false, 
      message: "Failed to update product", 
      error: err.message,
      details: err.sqlMessage || "Internal server error",
      productId: id
    });
    
  } finally {
    if (connection) connection.release();
  }
});

router.delete("/api/admin/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM products WHERE id = ?", [id]);
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ success: false, message: "Failed to delete product", error: err.message });
  }
});

module.exports = router;