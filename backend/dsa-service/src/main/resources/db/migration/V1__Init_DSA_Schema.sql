CREATE TABLE problem_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

INSERT INTO problem_categories (name) VALUES 
('Arrays'), ('Strings'), ('Linked Lists'), ('Trees'), 
('Graphs'), ('Dynamic Programming'), ('Backtracking');

CREATE TABLE problems (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    difficulty VARCHAR(20) NOT NULL, -- EASY, MEDIUM, HARD
    category_id INT REFERENCES problem_categories(id),
    is_premium BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE test_cases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    problem_id UUID REFERENCES problems(id) ON DELETE CASCADE,
    input_data TEXT NOT NULL,
    expected_output TEXT NOT NULL,
    is_hidden BOOLEAN DEFAULT TRUE
);

CREATE TABLE user_problem_status (
    user_id UUID NOT NULL, -- references users(id)
    problem_id UUID REFERENCES problems(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL, -- ATTEMPTED, SOLVED, BOOKMARKED
    PRIMARY KEY (user_id, problem_id)
);

CREATE TABLE submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL, -- references users(id)
    problem_id UUID REFERENCES problems(id) ON DELETE CASCADE,
    language VARCHAR(20) NOT NULL, -- CPP, JAVA, PYTHON
    code_snippet TEXT NOT NULL,
    status VARCHAR(20) NOT NULL, -- AC, WA, TLE, CE
    execution_time_ms INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
