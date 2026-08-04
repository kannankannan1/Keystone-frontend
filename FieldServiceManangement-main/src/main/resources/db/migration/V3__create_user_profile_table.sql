CREATE TABLE IF NOT EXISTS user_profile (
    id         BIGSERIAL PRIMARY KEY,
    user_id    BIGINT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    phone      VARCHAR(50),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
