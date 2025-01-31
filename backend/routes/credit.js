const express = require("express");
const router = express.Router();
const { body, param, validationResult } = require("express-validator");
const pool = require("../config/db");
const authenticate = require("../middleware/authenticate");
/**
 * @route   GET /credits/balance
 * @desc    Fetch user’s current credits
 * @access  Private (Authenticated users)
 */
router.get("/balance", authenticate, async (req, res) => {
    try {
        const userId = req.user.id;

        const result = await pool.query(
            "SELECT balance FROM user_credits WHERE user_id = $1",
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User credits not found" });
        }

        return res.json({ balance: result.rows[0].balance });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
});

/**
 * @route   POST /credits/add
 * @desc    Add credits via payment gateway
 * @access  Private (Authenticated users)
 */
router.post(
    "/add",
    authenticate,
    [
        body("amount").isInt({ min: 1 }).withMessage("Amount must be a positive integer"),
        body("payment_reference").notEmpty().withMessage("Payment reference is required"),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { amount, payment_reference } = req.body;
            const userId = req.user.id;

            // Update balance
            await pool.query(
                "INSERT INTO user_credits (user_id, balance) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET balance = user_credits.balance + EXCLUDED.balance",
                [userId, amount]
            );

            // Log transaction
            await pool.query(
                "INSERT INTO credit_transactions (user_id, type, amount, description) VALUES ($1, 'add', $2, $3)",
                [userId, amount, `Payment Ref: ${payment_reference}`]
            );

            return res.json({ message: "Credits added successfully" });
        } catch (error) {
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    }
);

/**
 * @route   POST /credits/deduct
 * @desc    Deduct credits after successful exchange
 * @access  Private (Authenticated users)
 */
router.post(
    "/deduct",
    authenticate,
    [
        body("amount").isInt({ min: 1 }).withMessage("Amount must be a positive integer"),
        body("reason").notEmpty().withMessage("Reason for deduction is required"),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { amount, reason } = req.body;
            const userId = req.user.id;

            // Check user's balance
            const balanceResult = await pool.query(
                "SELECT balance FROM user_credits WHERE user_id = $1",
                [userId]
            );

            if (balanceResult.rows.length === 0 || balanceResult.rows[0].balance < amount) {
                return res.status(400).json({ message: "Insufficient credits" });
            }

            // Deduct credits
            await pool.query(
                "UPDATE user_credits SET balance = balance - $1 WHERE user_id = $2",
                [amount, userId]
            );

            // Log transaction
            await pool.query(
                "INSERT INTO credit_transactions (user_id, type, amount, description) VALUES ($1, 'deduct', $2, $3)",
                [userId, amount, reason]
            );

            return res.json({ message: "Credits deducted successfully" });
        } catch (error) {
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    }
);

/**
 * @route   GET /credits/history
 * @desc    Fetch user's credit transaction history
 * @access  Private (Authenticated users)
 */
router.get("/history", authenticate, async (req, res) => {
    try {
        const userId = req.user.id;

        const result = await pool.query(
            "SELECT id, type, amount, description, created_at FROM credit_transactions WHERE user_id = $1 ORDER BY created_at DESC",
            [userId]
        );

        return res.json({ transactions: result.rows });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
