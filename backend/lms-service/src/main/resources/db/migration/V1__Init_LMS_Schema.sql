CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    thumbnail_url VARCHAR(255),
    is_premium BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    order_index INT NOT NULL
);

CREATE TABLE lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id UUID REFERENCES modules(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    youtube_embed_id VARCHAR(100),
    article_markdown TEXT,
    order_index INT NOT NULL,
    is_free_preview BOOLEAN DEFAULT FALSE
);

CREATE TABLE user_lesson_progress (
    user_id UUID NOT NULL, -- references users(id) from user-service
    lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL, -- UNSTARTED, IN_PROGRESS, COMPLETED
    watch_time_seconds INT DEFAULT 0,
    PRIMARY KEY (user_id, lesson_id)
);
