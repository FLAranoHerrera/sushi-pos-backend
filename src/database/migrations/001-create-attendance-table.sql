-- Migration: Create attendance_records table
-- Date: 2025-10-16
-- Description: Create the attendance_records table for the Attendance module

CREATE TABLE IF NOT EXISTS attendance_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID NOT NULL,
    date DATE NOT NULL,
    check_in TIMESTAMP,
    check_out TIMESTAMP,
    worked_hours DECIMAL(5,2),
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign key constraint
    CONSTRAINT fk_attendance_employee 
        FOREIGN KEY (employee_id) 
        REFERENCES users(id) 
        ON DELETE CASCADE,
    
    -- Unique constraint: one record per employee per day
    CONSTRAINT uk_attendance_employee_date 
        UNIQUE (employee_id, date)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_attendance_employee ON attendance_records(employee_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance_records(date);
CREATE INDEX IF NOT EXISTS idx_attendance_status ON attendance_records(status);

-- Add comments
COMMENT ON TABLE attendance_records IS 'Employee attendance records';
COMMENT ON COLUMN attendance_records.employee_id IS 'Reference to users table';
COMMENT ON COLUMN attendance_records.date IS 'Date of attendance (YYYY-MM-DD)';
COMMENT ON COLUMN attendance_records.check_in IS 'Check-in timestamp';
COMMENT ON COLUMN attendance_records.check_out IS 'Check-out timestamp';
COMMENT ON COLUMN attendance_records.worked_hours IS 'Total hours worked (decimal)';
COMMENT ON COLUMN attendance_records.status IS 'Attendance status: PENDING, ON_TIME, LATE, ABSENT, EXTRA_HOURS';
COMMENT ON COLUMN attendance_records.notes IS 'Additional notes about attendance';
