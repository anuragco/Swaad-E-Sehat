-- Create settings table for storing application configuration
CREATE TABLE IF NOT EXISTS settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default payment method settings
INSERT INTO settings (setting_key, setting_value, description) 
VALUES 
    ('cod_enabled', 'false', 'Enable or disable Cash on Delivery payment option'),
    ('online_payment_enabled', 'true', 'Enable or disable Online Payment option')
ON DUPLICATE KEY UPDATE 
    setting_value = VALUES(setting_value);
