const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const authenticate = require("../middleware/authenticate");

// GET User Details
router.get("/details", authenticate, async (req, res) => {
    try {
        const userId = req.user.id;

        // Fetch user details from database
        const result = await pool.query(
            "SELECT id, full_name, username, email, profile_picture, bio, skills, credits, role, is_verified, created_at, last_login FROM users WHERE id = $1",
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.json(result.rows[0]); // Return user details
    } catch (error) {
        console.error("Error fetching user details:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
