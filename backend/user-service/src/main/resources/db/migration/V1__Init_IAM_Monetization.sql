CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO roles (name) VALUES 
('ROLE_FREE'), 
('ROLE_BASIC'), 
('ROLE_PLUS'), 
('ROLE_PRO');

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    full_name VARCHAR(255) NOT NULL,
    provider VARCHAR(50) DEFAULT 'LOCAL',
    streak_count INT DEFAULT 0,
    total_score INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_roles (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role_id INT REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

CREATE TABLE subscription_plans (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    daily_run_limit INT NOT NULL,
    daily_ai_tokens INT NOT NULL
);

INSERT INTO subscription_plans (name, price, daily_run_limit, daily_ai_tokens) VALUES 
('Basic', 9.99, 50, 10),
('Plus', 19.99, 200, 50),
('Pro', 29.99, 1000, 200);

CREATE TABLE user_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    plan_id INT REFERENCES subscription_plans(id) ON DELETE RESTRICT,
    status VARCHAR(20) NOT NULL, -- ACTIVE, EXPIRED, CANCELLED
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL
);

CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    payment_gateway_ref VARCHAR(255) UNIQUE,
    status VARCHAR(50) NOT NULL, -- SUCCESS, PENDING, FAILED
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
