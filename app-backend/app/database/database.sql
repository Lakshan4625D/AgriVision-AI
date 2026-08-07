-- =====================================================
-- AgriVision AI
-- Initial Database Setup
-- Version: 1.0
-- =====================================================

-- Drop database (OPTIONAL - only for development)
-- DROP DATABASE IF EXISTS agrivision_ai;

-- Create database
CREATE DATABASE IF NOT EXISTS agrivision_ai
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE agrivision_ai;

-- =====================================================
-- Roles Table
-- =====================================================

CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- Users Table
-- =====================================================

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,

    full_name VARCHAR(150) NOT NULL,

    email VARCHAR(255) NOT NULL UNIQUE,

    password_hash VARCHAR(255) NOT NULL,

    phone VARCHAR(20),

    role_id INT NOT NULL,

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_user_role
        FOREIGN KEY (role_id)
        REFERENCES roles(id)
);

-- =====================================================
-- Analysis Table
-- =====================================================

CREATE TABLE analysis_history (
    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    image_name VARCHAR(255),

    crop_type VARCHAR(100),

    quality VARCHAR(50),

    stage VARCHAR(100),

    stage_confidence FLOAT,

    stress_class VARCHAR(100),

    stress_confidence FLOAT,

    severity FLOAT,

    severity_label VARCHAR(50),

    latitude DOUBLE,

    longitude DOUBLE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- =====================================================
-- Seed Roles
-- =====================================================

INSERT IGNORE INTO roles (id, name) VALUES
(1, 'Admin'),
(2, 'Officer'),
(3, 'Surveyor'),
(4, 'Farmer');

-- =====================================================
-- Verify
-- =====================================================

SELECT * FROM roles;
SELECT * FROM users;