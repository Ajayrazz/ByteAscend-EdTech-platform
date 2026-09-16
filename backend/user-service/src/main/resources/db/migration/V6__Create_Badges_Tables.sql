CREATE TABLE badges (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    icon_url VARCHAR(255) NOT NULL,
    required_score INT DEFAULT 0
);

CREATE TABLE user_badges (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    badge_id INT NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, badge_id)
);

INSERT INTO badges (name, description, icon_url) VALUES 
('First Blood', 'Solved your first problem', '/images/badges/badge_first_blood.jpg'),
('7-Day Streak', 'Maintained a 7-day problem solving streak', '/images/badges/badge_streak_7.jpg'),
('Array Master', 'Solved 10 array-related problems', '/images/badges/badge_array_master.jpg');
