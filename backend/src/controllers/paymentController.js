import { Course, Payment, User } from "../models/models.js";
import PaymentMethods from "../models/PaymentMethod.js";
import paypal from "paypal-rest-sdk";

// Cấu hình PayPal
paypal.configure({
  mode: "sandbox", // Chuyển thành "live" nếu muốn dùng thật
  client_id:
    "AbcwZxmB9NLW99QSdFeTmTuQ2J_rajEZxaVtfaQM5t5ANatwJki2WRR0FHugTIPMQH-WcTC26ylVuVVD",
  client_secret:
    "EEecaVaURvDPjGqHp82d01ccNPmUdeslAyxz-FeDYWVe7eNFCq_fHWSsHY2zv5Ft4-yGc4JUnpWEXGt-",
});

export const addPayment = async (req, res) => {
  const { course_id, user_id, amount, payment_method_id, status } = req.body;

  const exchangeRate = 24000; // 1 USD = 24,000 VND (update the rate dynamically if needed)
  const totalUSD = (
    amount.reduce((sum, val) => sum + val, 0) / exchangeRate
  ).toFixed(2);

  try {
    // Ensure course_id and amount are arrays of the same length
    if (
      !Array.isArray(course_id) ||
      !Array.isArray(amount) ||
      course_id.length !== amount.length
    ) {
      return res.status(400).json({
        error: "course_id and amount must be arrays of the same length",
      });
    }

    // Fetch course details
    const courseDetails = await Promise.all(
      course_id.map(async (id) => {
        const course = await Course.findByPk(id);
        if (!course) {
          throw new Error(`Course with id ${id} not found`);
        }
        return course;
      })
    );

    // Create PayPal payment JSON
    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: `http://localhost:5173/payment-success?course_id=${course_id.join(
          ","
        )}`, // Thêm course_id vào URL
        cancel_url: "http://localhost:5173/payment-cancel", // URL khi thanh toán bị hủy
      },
      transactions: [
        {
          amount: {
            currency: "USD",
            total: totalUSD,
          },
          description: "Payment for courses",
          item_list: {
            items: courseDetails.map((course, index) => ({
              name: course.title,
              price: (amount[index] / exchangeRate).toFixed(2),
              currency: "USD",
              quantity: 1,
            })),
          },
        },
      ],
    };

    // Create PayPal payment
    paypal.payment.create(create_payment_json, async (error, payment) => {
      if (error) {
        console.error("Error creating PayPal payment:", error);
        return res.status(500).json({ message: "PayPal payment failed" });
      }

      const approvalUrl = payment.links.find(
        (link) => link.rel === "approval_url"
      )?.href;

      if (!approvalUrl) {
        return res
          .status(500)
          .json({ message: "No approval URL found in PayPal payment" });
      }

      // Save payment details to the database
      for (let i = 0; i < course_id.length; i++) {
        await Payment.create({
          course_id: course_id[i],
          user_id,
          amount: amount[i],
          payment_method_id: payment_method_id || "paypal",
          status: "completed",
        });
      }

      res.status(201).json({
        message: "Payment created, redirect to PayPal for approval",
        approvalUrl,
      });
    });
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// xác nhận thanh toán từ Paypal
export const verifyPaymentPaypal = async (req, res) => {
  const { paymentId, PayerID } = req.query;

  try {
    paypal.payment.execute(
      paymentId,
      { payer_id: PayerID },
      async (error, payment) => {
        if (error) {
          console.error("PayPal Execute Error:", error);
          return res.status(400).json({ status: "failed", message: error });
        }

        if (payment.state === "approved") {
          res.status(200).json({ status: "success" });
        } else {
          res
            .status(400)
            .json({ status: "failed", message: "Payment not approved" });
        }
      }
    );
  } catch (error) {
    console.error("Error verifying payment:", error);
    res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error" });
  }
};

export const detailPayment = async (req, res) => {
  const { id } = req.query;

  try {
    const payment = await Payment.findByPk(id, {
      include: [
        {
          model: Course,
        },
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
      ],
    });

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json({ message: "OK", payment });
  } catch (error) {
    console.error("Error fetching payment details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllPaymentEachUser = async (req, res) => {
  const { user_id } = req.query;

  try {
    const payments = await Payment.findAll({
      where: { user_id },
      include: [
        {
          model: Course, // Liên kết với bảng Course
        },
      ],
    });

    res.status(200).json({ message: "OK", payments });
  } catch (error) {
    console.error("Error fetching user payments:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllPaymentEachCourse = async (req, res) => {
  const { course_id } = req.query;

  try {
    const payments = await Payment.findAll({
      where: { course_id },
      include: [
        {
          model: User, // Liên kết với bảng User
          attributes: ["id", "name", "email", "avatar"],
        },
      ],
    });

    res.status(200).json({ message: "OK", payments });
  } catch (error) {
    console.error("Error fetching course payments:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllPaymentAllCourse = async (req, res) => {
  const { instructor_id } = req.query;

  try {
    const payments = await Payment.findAll({
      include: [
        {
          model: User, // Liên kết với bảng User
          attributes: ["id", "name", "email", "avatar"],
        },
        {
          model: Course,
          where: {
            instructor_id,
          },
        },
        { model: PaymentMethods },
      ],
    });

    res.status(200).json({ message: "OK", payments });
  } catch (error) {
    console.error("Error fetching course payments:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
