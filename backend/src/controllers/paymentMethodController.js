import PaymentMethod from "../models/PaymentMethod.js";

export const getAllPaymentMethod = async (req, res) => {
  try {
    const paymentMethod = await PaymentMethod.findAll();

    if (!paymentMethod) {
      return res.status(404).json({ message: "Payment method not found !" });
    }

    res.status(200).json({ message: "OK", paymentMethod });
  } catch (error) {
    console.error("Error fetching:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addPaymentMethod = async (req, res) => {
  try {
    const { name, img } = req.body;

    // Check if name and img are provided
    if (!name || !img) {
      return res
        .status(400)
        .json({ message: "Name and image URL are required!" });
    }

    // Create a new payment method
    const newPaymentMethod = await PaymentMethod.create({ name, img });

    res.status(201).json({
      message: "Payment method added successfully!",
      paymentMethod: newPaymentMethod,
    });
  } catch (error) {
    console.error("Error adding payment method:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deletePaymentMethod = async (req, res) => {
  try {
    const { id } = req.query;

    // Check if the payment method exists
    const paymentMethod = await PaymentMethod.findByPk(id);
    if (!paymentMethod) {
      return res.status(404).json({ message: "Payment method not found!" });
    }

    // Delete the payment method
    await paymentMethod.destroy();

    res.status(200).json({ message: "Payment method deleted successfully!" });
  } catch (error) {
    console.error("Error deleting payment method:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
