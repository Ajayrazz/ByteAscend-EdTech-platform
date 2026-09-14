CREATE TABLE dsa_sheet_days (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    order_num INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE dsa_sheet_problems (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    day_id UUID REFERENCES dsa_sheet_days(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    article_url VARCHAR(500),
    youtube_url VARCHAR(500),
    practice_url VARCHAR(500),
    difficulty VARCHAR(50) NOT NULL,
    time_estimate VARCHAR(50),
    companies VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert dummy data for Day 1
INSERT INTO dsa_sheet_days (id, title, order_num) VALUES 
('11111111-1111-1111-1111-111111111111', 'Day 1 : Array (Part 1)', 1);

INSERT INTO dsa_sheet_problems (day_id, title, article_url, youtube_url, practice_url, difficulty, time_estimate, companies) VALUES 
('11111111-1111-1111-1111-111111111111', 'Majority Element', 'https://example.com/article1', 'https://youtube.com', 'https://leetcode.com', 'Easy', '30Min', 'Google,Amazon'),
('11111111-1111-1111-1111-111111111111', 'Repeat & missing number', 'https://example.com/article2', 'https://youtube.com', 'https://leetcode.com', 'Easy', '30Min', 'Amazon'),
('11111111-1111-1111-1111-111111111111', 'Merge 2 sorted array without extra space', 'https://example.com/article3', 'https://youtube.com', 'https://leetcode.com', 'Easy', '30Min', 'Google,Apple'),
('11111111-1111-1111-1111-111111111111', 'Single Number', 'https://example.com/article4', 'https://youtube.com', 'https://leetcode.com', 'Easy', '30Min', 'Apple,Google'),
('11111111-1111-1111-1111-111111111111', 'Stock Buy & Sell', 'https://example.com/article5', 'https://youtube.com', 'https://leetcode.com', 'Easy', '30Min', 'Google,Meta'),
('11111111-1111-1111-1111-111111111111', 'Pow (x^n)', 'https://example.com/article6', 'https://youtube.com', 'https://leetcode.com', 'Medium', '30Min', 'LinkedIn,Amazon');

-- Insert dummy data for Day 2
INSERT INTO dsa_sheet_days (id, title, order_num) VALUES 
('22222222-2222-2222-2222-222222222222', 'Day 2 : Array (Part 2)', 2);

INSERT INTO dsa_sheet_problems (day_id, title, article_url, youtube_url, practice_url, difficulty, time_estimate, companies) VALUES 
('22222222-2222-2222-2222-222222222222', 'Kadane''s Algorithm', 'https://example.com/article7', 'https://youtube.com', 'https://leetcode.com', 'Medium', '30Min', 'Meta,Google'),
('22222222-2222-2222-2222-222222222222', 'Container with most water', 'https://example.com/article8', 'https://youtube.com', 'https://leetcode.com', 'Medium', '30Min', 'Facebook,Google'),
('22222222-2222-2222-2222-222222222222', 'Sort array of 0s, 1s & 2s', 'https://example.com/article9', 'https://youtube.com', 'https://leetcode.com', 'Medium', '30Min', 'Amazon,Google');
