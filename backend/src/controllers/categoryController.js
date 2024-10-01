import { Category } from "../models/models.js";

export const addCategory = async (req, res) => {
  const { name, description } = req.body; // Lấy name và description từ request body

  const existingCategory = await Category.findOne({ where: { name } });

  // Kiểm tra xem name có tồn tại không
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  if (existingCategory) {
    return res.status(400).json({ error: "Danh mục đã tồn tại" });
  }

  try {
    // Tạo một danh mục mới
    const newCategory = await Category.create({
      name,
      description,
    });

    // Trả về danh mục mới được tạo
    res.status(201).json({ message: "OK", newCategory });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json({ categories });
  } catch (error) {
    console.error("Error fectching categories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const detailCategory = async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "id is required" });
  }

  try {
    const detail = await Category.findOne({ where: { id } });
    res.status(200).json({ detail });
  } catch (error) {
    console.error("Error detail category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateCategory = async (req, res) => {
  const { id, name, description } = req.body;

  try {
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.name = name || category.name;
    category.description = description || category.description;

    await category.save();

    res.status(200).json({ message: "OK", category });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Internal Server Error" }); // Lỗi server
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.query;

  try {
    // Lấy thông tin người dùng hiện tại
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ error: "Không tìm thấy danh mục !" });
    }

    if (category) {
      await category.destroy({
        where: {
          id: id,
        },
      });

      return res.status(200).json({ message: "OK" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};
