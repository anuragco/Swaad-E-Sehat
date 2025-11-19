const express = require('express');
const router = express.Router();
const pool = require('../Config/db');
const adminAuth = require('../Middleware/adminAuth');
const rateLimit = require('express-rate-limit');

const paymentSettingsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});

const adminPaymentSettingsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: 'Too many requests from this IP, please try again later.'
});

router.get('/api/payment-settings', paymentSettingsLimiter, async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT setting_key, setting_value 
       FROM settings 
       WHERE setting_key IN ('cod_enabled', 'online_payment_enabled')`
    );

    const settings = {
      cod_enabled: false,
      online_payment_enabled: true
    };

    rows.forEach(row => {
      settings[row.setting_key] = row.setting_value === 'true';
    });

    res.json({
      success: true,
      data: settings
    });
  } catch (err) {
    console.error('Error fetching payment settings:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payment settings'
    });
  }
});

router.post('/api/admin/payment-settings', adminAuth, adminPaymentSettingsLimiter, async (req, res) => {
  try {
    const { cod_enabled, online_payment_enabled } = req.body;

    if (!cod_enabled && !online_payment_enabled) {
      return res.status(400).json({
        success: false,
        message: 'At least one payment method must be enabled'
      });
    }

    let connection;
    try {
      connection = await pool.getConnection();
      await connection.beginTransaction();

      if (cod_enabled !== undefined) {
        await connection.query(
          `INSERT INTO settings (setting_key, setting_value, description)
           VALUES ('cod_enabled', ?, 'Enable or disable Cash on Delivery payment option')
           ON DUPLICATE KEY UPDATE setting_value = ?`,
          [cod_enabled.toString(), cod_enabled.toString()]
        );
      }

      if (online_payment_enabled !== undefined) {
        await connection.query(
          `INSERT INTO settings (setting_key, setting_value, description)
           VALUES ('online_payment_enabled', ?, 'Enable or disable Online Payment option')
           ON DUPLICATE KEY UPDATE setting_value = ?`,
          [online_payment_enabled.toString(), online_payment_enabled.toString()]
        );
      }

      await connection.commit();

      res.json({
        success: true,
        message: 'Payment settings updated successfully',
        data: {
          cod_enabled,
          online_payment_enabled
        }
      });
    } catch (err) {
      if (connection) {
        await connection.rollback();
      }
      throw err;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  } catch (err) {
    console.error('Error updating payment settings:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to update payment settings'
    });
  }
});

module.exports = router;
