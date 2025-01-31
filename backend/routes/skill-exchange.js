const express = require("express");
const router = express.Router();
const { body, param, validationResult } = require("express-validator");
const pool = require("../config/db");
const authenticate = require("../middleware/authenticate");

// 1. POST /exchange/initiate → Initiate a skill exchange
router.post(
    "/initiate",
    authenticate,
    [
        body("skill_id").isUUID(),
        body("credit_amount").isInt({ min: 0 }),
        body("recipient_id").isUUID(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { skill_id, credit_amount, recipient_id } = req.body;
        const initiator_id = req.user.id; // Get user from JWT token

        try {
            // Check if initiator has enough credits
            const userQuery = await pool.query("SELECT credits FROM users WHERE id = $1", [initiator_id]);

            if (userQuery.rows.length === 0) {
                return res.status(404).json({ error: "User not found" });
            }

            const currentCredits = userQuery.rows[0].credits;
            if (currentCredits < credit_amount) {
                return res.status(400).json({ error: "Insufficient credits to initiate exchange" });
            }

            // Initiate skill exchange
            const newExchange = await pool.query(
                "INSERT INTO skill_exchanges (initiator_id, recipient_id, skill_id, credit_amount, status) VALUES ($1, $2, $3, $4, 'initiated') RETURNING *",
                [initiator_id, recipient_id, skill_id, credit_amount]
            );

            res.status(201).json(newExchange.rows[0]);
        } catch (err) {
            console.error("Error initiating skill exchange:", err);
            res.status(500).json({ error: "Server error" });
        }
    }
);

// 2. PUT /exchange/accept/:id → Accept a skill exchange
router.put(
    "/accept/:id",
    authenticate,
    param("id").isUUID(),
    async (req, res) => {
        const { id } = req.params;
        const recipient_id = req.user.id;

        try {
            const result = await pool.query(
                "UPDATE skill_exchanges SET status = 'accepted', accepted_at = NOW() WHERE id = $1 AND recipient_id = $2 AND status = 'initiated' RETURNING *",
                [id, recipient_id]
            );

            if (result.rows.length === 0) return res.status(404).json({ error: "Exchange not found or already accepted/rejected" });

            res.status(200).json(result.rows[0]);
        } catch (err) {
            res.status(500).json({ error: "Server error" });
        }
    }
);

// 3. PUT /exchange/reject/:id → Reject a skill exchange
router.put(
    "/reject/:id",
    authenticate,
    param("id").isUUID(),
    async (req, res) => {
        const { id } = req.params;
        const recipient_id = req.user.id;

        try {
            const result = await pool.query(
                "UPDATE skill_exchanges SET status = 'rejected', rejected_at = NOW() WHERE id = $1 AND recipient_id = $2 AND status = 'initiated' RETURNING *",
                [id, recipient_id]
            );

            if (result.rows.length === 0) return res.status(404).json({ error: "Exchange not found or already accepted/rejected" });

            res.status(200).json(result.rows[0]);
        } catch (err) {
            res.status(500).json({ error: "Server error" });
        }
    }
);

// 4. POST /exchange/complete/:id → Complete a skill exchange
router.post(
    "/complete/:id",
    authenticate,
    param("id").isUUID(),
    body("review").isString().optional(),
    body("rating").isInt({ min: 1, max: 5 }).optional(),
    async (req, res) => {
        const { id } = req.params;
        const { review, rating } = req.body;
        const user_id = req.user.id;

        const client = await pool.connect(); // Start transaction
        try {
            await client.query("BEGIN");

            // Fetch skill exchange details
            const exchangeQuery = await client.query(
                "SELECT * FROM skill_exchanges WHERE id = $1 AND (initiator_id = $2 OR recipient_id = $2) AND status = 'accepted'",
                [id, user_id]
            );

            if (exchangeQuery.rows.length === 0) {
                await client.query("ROLLBACK");
                return res.status(404).json({ error: "Exchange not found or not accepted" });
            }

            const exchange = exchangeQuery.rows[0];
            const { initiator_id, recipient_id, credit_amount } = exchange;

            // Deduct credits from initiator
            const deductCredits = await client.query(
                "UPDATE users SET credits = credits - $1 WHERE id = $2 AND credits >= $1 RETURNING *",
                [credit_amount, initiator_id]
            );

            if (deductCredits.rows.length === 0) {
                await client.query("ROLLBACK");
                return res.status(400).json({ error: "Insufficient credits for initiator" });
            }

            // Add credits to recipient
            await client.query(
                "UPDATE users SET credits = credits + $1 WHERE id = $2 RETURNING *",
                [credit_amount, recipient_id]
            );

            // Complete the exchange
            const updateExchange = await client.query(
                "UPDATE skill_exchanges SET status = 'completed', completed_at = NOW(), review = $1, rating = $2 WHERE id = $3 RETURNING *",
                [review, rating, id]
            );

            await client.query("COMMIT");
            res.status(200).json(updateExchange.rows[0]);
        } catch (err) {
            await client.query("ROLLBACK");
            console.error("Error completing skill exchange:", err);
            res.status(500).json({ error: "Server error" });
        } finally {
            client.release();
        }
    }
);


// 5. GET /exchange/history → Get user's skill exchange history
router.get(
    "/history",
    authenticate,
    async (req, res) => {
        const user_id = req.user.id;

        try {
            const exchanges = await pool.query(
                "SELECT * FROM skill_exchanges WHERE initiator_id = $1 OR recipient_id = $1 ORDER BY created_at DESC",
                [user_id]
            );

            res.json(exchanges.rows);
        } catch (err) {
            res.status(500).json({ error: "Server error" });
        }
    }
);

// 6. GET /exchange/:id → Fetch details of a skill exchange
router.get(
    "/:id",
    authenticate,
    param("id").isUUID(),
    async (req, res) => {
        const { id } = req.params;

        try {
            const exchange = await pool.query("SELECT * FROM skill_exchanges WHERE id = $1", [id]);

            if (exchange.rows.length === 0) return res.status(404).json({ error: "Exchange not found" });

            res.json(exchange.rows[0]);
        } catch (err) {
            res.status(500).json({ error: "Server error" });
        }
    }
);

module.exports = router;
