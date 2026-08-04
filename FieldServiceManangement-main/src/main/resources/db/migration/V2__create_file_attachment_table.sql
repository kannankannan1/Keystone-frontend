CREATE TABLE IF NOT EXISTS file_attachment (
    id BIGSERIAL PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(100),
    file_size BIGINT,
    file_path VARCHAR(500) NOT NULL,
    file_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    work_order_id BIGINT REFERENCES work_order(id),
    uploaded_by BIGINT REFERENCES users(id)
);