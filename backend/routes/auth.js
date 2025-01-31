const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../config/db');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

const router = express.Router();

router.post("/signup", async (req, res) => {
    const { fullName, username, email, password } = req.body;

    try {
        // Validate required fields
        if (!fullName || !username || !email || !password) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Check if user already exists
        const checkUserQuery = `SELECT email FROM users WHERE email = $1 OR username = $2`;
        const userCheckResult = await pool.query(checkUserQuery, [email, username]);

        if (userCheckResult.rows.length > 0) {
            return res.status(400).json({ error: "Email or username already registered." });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate OTP
        const otp = crypto.randomInt(100000, 999999).toString();
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

        // Insert user into database
        const query = `
            INSERT INTO users (full_name, username, email, password_hash, otp_code, otp_expires_at, is_verified) 
            VALUES ($1, $2, $3, $4, $5, $6, FALSE)
            RETURNING id, created_at;
        `;

        const values = [fullName, username, email, hashedPassword, otp, otpExpiresAt];
        const result = await pool.query(query, values);
        const { id, created_at } = result.rows[0];

        // Send OTP via email
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Verify Your Account",
            html: `
                <h2>Verify Your Email</h2>
                <p>Use the OTP below to verify your SkillMart account:</p>
                <h3>${otp}</h3>
                <p>Valid for 10 minutes.</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            message: "OTP sent to your email.",
            userId: id,
            createdAt: created_at,
        });

    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ error: "Signup failed. Please try again later." });
    }
});

module.exports = router;

// OTP Verification route
router.post('/verify-otp', async (req, res) => {
    const { userId, otp } = req.body;
    const client = await pool.connect(); // Start transaction

    try {
        await client.query("BEGIN");

        // Fetch user details
        const query = `SELECT otp_code, otp_expires_at, is_verified, credits FROM users WHERE id = $1`;
        const result = await client.query(query, [userId]);

        if (result.rows.length === 0) {
            await client.query("ROLLBACK");
            return res.status(404).json({ error: 'User not found.' });
        }

        const { otp_code, otp_expires_at, is_verified, credits } = result.rows[0];

        if (is_verified) {
            await client.query("ROLLBACK");
            return res.status(400).json({ error: 'Account already verified.' });
        }

        if (otp_code !== otp) {
            await client.query("ROLLBACK");
            return res.status(400).json({ error: 'Invalid OTP.' });
        }

        if (new Date() > otp_expires_at) {
            await client.query("ROLLBACK");
            return res.status(400).json({ error: 'OTP has expired.' });
        }

        // Mark account as verified and add 200 credits
        const updateQuery = `
            UPDATE users 
            SET is_verified = TRUE, otp_code = NULL, credits = credits + 200 
            WHERE id = $1 
            RETURNING id, is_verified, credits
        `;
        const updatedUser = await client.query(updateQuery, [userId]);

        await client.query("COMMIT"); // Commit transaction

        res.status(200).json({
            message: 'Account verified successfully.',
            user: updatedUser.rows[0]
        });
    } catch (error) {
        await client.query("ROLLBACK"); // Rollback in case of an error
        console.error('Error during OTP verification:', error);
        res.status(500).json({ error: 'OTP verification failed. Please try again later.' });
    } finally {
        client.release();
    }
});


// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const checkUserQuery = `SELECT id, email, password_hash, is_verified FROM users WHERE email = $1`;
        const userResult = await pool.query(checkUserQuery, [email]);

        if (userResult.rows.length === 0) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }

        const user = userResult.rows[0];

        if (!user.is_verified) {
            return res.status(400).json({ error: 'Account not verified. Please verify first.' });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Update last login time
        await pool.query(`UPDATE users SET last_login = NOW() WHERE id = $1`, [user.id]);

        res.status(200).json({
            message: 'Login successful.',
            jwtToken: token,
            userId: user.id,
        });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Login failed. Please try again later.' });
    }
});

module.exports = router;
