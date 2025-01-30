const express = require("express");
const router = express.Router();
const { body, param, query, validationResult } = require("express-validator");
const pool = require("../config/db");
const authenticate = require("../middleware/authenticate");

//  POST /skills/post → Create a new skill post
router.post(
    "/post",
    authenticate,
    [
        body("title").isString().isLength({ min: 3 }).trim(),
        body("category").isString().notEmpty(),
        body("description").isString().notEmpty(),
        body("credit_cost").isInt({ min: 0 }),
        body("images").isArray().optional(),
        body("type").isIn(["offer", "request"]),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { title, category, description, credit_cost, images, type } = req.body;
        const user_id = req.user.id; // Get user from JWT token

        try {
            const newSkill = await pool.query(
                "INSERT INTO skills (user_id, title, category, description, credit_cost, images, type) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
                [user_id, title, category, description, credit_cost, images, type]
            );
            res.status(201).json(newSkill.rows[0]);
        } catch (err) {
            res.status(500).json({ error: "Server error" });
        }
    }
);

//  GET /skills/list → Fetch all skills with optional filters
router.get(
    "/list",
    authenticate,
    [
        query("category").optional().isString(),
        query("type").optional().isIn(["offer", "request"]),
        query("status").optional().isIn(["active", "completed", "cancelled"]),
    ],
    async (req, res) => {
        try {
            let query = "SELECT * FROM skills WHERE 1=1";
            const params = [];

            if (req.query.category) {
                query += " AND category = $1";
                params.push(req.query.category);
            }
            if (req.query.type) {
                query += ` AND type = $${params.length + 1}`;
                params.push(req.query.type);
            }
            if (req.query.status) {
                query += ` AND status = $${params.length + 1}`;
                params.push(req.query.status);
            }

            const skills = await pool.query(query, params);
            res.json(skills.rows);
        } catch (err) {
            res.status(500).json({ error: "Server error" });
        }
    }
);

// GET /skills/:id → Fetch skill details
router.get(
    "/:id",
    authenticate,
    param("id").isUUID(),
    async (req, res) => {
        try {
            const skill = await pool.query("SELECT * FROM skills WHERE id = $1", [req.params.id]);

            if (skill.rows.length === 0) return res.status(404).json({ error: "Skill not found" });

            res.json(skill.rows[0]);
        } catch (err) {
            res.status(500).json({ error: "Server error" });
        }
    }
);

// PUT /skills/:id → Update a skill post
router.put(
    "/:id",
    authenticate,
    [
        param("id").isUUID(),
        body("title").optional().isString().trim(),
        body("category").optional().isString(),
        body("description").optional().isString(),
        body("credit_cost").optional().isInt({ min: 0 }),
        body("images").optional().isArray(),
        body("status").optional().isIn(["active", "completed", "cancelled"]),
    ],
    async (req, res) => {
        try {
            const { id } = req.params;
            const user_id = req.user.id;
            const updates = Object.entries(req.body).map(([key, value], index) => `${key} = $${index + 1}`);
            const values = [...Object.values(req.body), id, user_id];

            if (updates.length === 0) return res.status(400).json({ error: "No fields to update" });

            const query = `UPDATE skills SET ${updates.join(", ")} WHERE id = $${updates.length + 1} AND user_id = $${updates.length + 2} RETURNING *`;

            const result = await pool.query(query, values);
            if (result.rows.length === 0) return res.status(404).json({ error: "Skill not found or unauthorized" });

            res.json(result.rows[0]);
        } catch (err) {
            res.status(500).json({ error: "Server error" });
        }
    }
);

//  DELETE /skills/:id → Remove a skill post
router.delete(
    "/:id",
    authenticate,
    param("id").isUUID(),
    async (req, res) => {
        try {
            const result = await pool.query("DELETE FROM skills WHERE id = $1 AND user_id = $2 RETURNING *", [req.params.id, req.user.id]);

            if (result.rows.length === 0) return res.status(404).json({ error: "Skill not found or unauthorized" });

            res.json({ message: "Skill deleted successfully" });
        } catch (err) {
            res.status(500).json({ error: "Server error" });
        }
    }
);

module.exports = router;
