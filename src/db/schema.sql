-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgvector";

-- School metadata table (verified data, cached from Wikipedia/APIs)
CREATE TABLE schools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(200) NOT NULL,
  abbreviation VARCHAR(50),
  city VARCHAR(100) NOT NULL,
  state CHAR(2) NOT NULL,
  country VARCHAR(100) DEFAULT 'US',
  founded INTEGER,
  mascot VARCHAR(100),
  motto TEXT,
  nickname VARCHAR(100),
  logo_url TEXT,
  building_url TEXT,
  skyline_url TEXT,
  wikipedia_url TEXT,
  coordinate_lat DECIMAL(9, 6) NOT NULL,
  coordinate_lng DECIMAL(9, 6) NOT NULL,
  verification_status VARCHAR(20) DEFAULT 'pending' CHECK (verification_status IN ('verified', 'pending', 'failed')),
  verified_at TIMESTAMP,
  cached_at TIMESTAMP DEFAULT NOW(),
  confidence DECIMAL(3, 2) DEFAULT 0.5,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(name, state, country),
  INDEX idx_school_location (city, state),
  INDEX idx_school_status (verification_status)
);

-- School colors table
CREATE TABLE school_colors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  hex_code VARCHAR(7) NOT NULL,
  rgb_r INTEGER,
  rgb_g INTEGER,
  rgb_b INTEGER,
  usage VARCHAR(20) CHECK (usage IN ('primary', 'secondary', 'accent')),
  source VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_school_colors (school_id)
);

-- School landmarks table
CREATE TABLE school_landmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  image_url TEXT,
  latitude DECIMAL(9, 6),
  longitude DECIMAL(9, 6),
  created_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_landmarks_school (school_id)
);

-- Poster generation requests
CREATE TABLE poster_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  school_id UUID REFERENCES schools(id),
  school_name VARCHAR(200) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state CHAR(2) NOT NULL,
  graduation_year INTEGER NOT NULL,
  style VARCHAR(50) NOT NULL CHECK (style IN (
    'sports', 'varsity', 'luxury', 'vintage', 'military-tribute',
    'hall-of-fame', 'movie-poster', 'magazine-cover', 'street-art'
  )),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN (
    'pending', 'processing', 'completed', 'failed'
  )),
  customizations JSONB,
  portrait_url TEXT,
  portrait_file_name VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_requests_user (user_id),
  INDEX idx_requests_status (status),
  INDEX idx_requests_created (created_at DESC)
);

-- Poster generation jobs (track detailed progress)
CREATE TABLE poster_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_id UUID NOT NULL REFERENCES poster_requests(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'pending',
  stage VARCHAR(50) NOT NULL CHECK (stage IN (
    'metadata-lookup', 'background-removal', 'ai-generation',
    'upscaling', 'rendering'
  )),
  stage_progress INTEGER DEFAULT 0,
  portrait_image_url TEXT,
  background_removed_url TEXT,
  ai_generated_url TEXT,
  upscaled_url TEXT,
  final_url TEXT,
  error_code VARCHAR(100),
  error_message TEXT,
  error_recoverable BOOLEAN,
  started_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_jobs_request (request_id),
  INDEX idx_jobs_status (status)
);

-- Cache for school metadata lookups
CREATE TABLE metadata_cache (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cache_key VARCHAR(255) NOT NULL UNIQUE,
  data JSONB NOT NULL,
  source VARCHAR(50), -- 'wikipedia', 'wikimedia', 'nominatim'
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_cache_expiry (expires_at)
);

-- Generated image cache
CREATE TABLE image_cache (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cache_key VARCHAR(255) NOT NULL UNIQUE,
  image_url TEXT NOT NULL,
  prompt TEXT,
  model VARCHAR(100),
  metadata JSONB,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_image_cache_expiry (expires_at)
);

-- Audit log for compliance
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  entity_type VARCHAR(50) NOT NULL,
  entity_id UUID NOT NULL,
  action VARCHAR(50) NOT NULL,
  changes JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_audit_entity (entity_type, entity_id),
  INDEX idx_audit_user (user_id),
  INDEX idx_audit_created (created_at DESC)
);

-- API rate limiting (tracks per-user usage)
CREATE TABLE rate_limits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  request_type VARCHAR(100) NOT NULL,
  count INTEGER DEFAULT 1,
  reset_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, request_type, reset_at),
  INDEX idx_rate_limit_reset (reset_at)
);

-- Provider health monitoring
CREATE TABLE provider_health (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_name VARCHAR(100) NOT NULL UNIQUE,
  status VARCHAR(20) DEFAULT 'healthy' CHECK (status IN ('healthy', 'degraded', 'down')),
  error_rate DECIMAL(3, 2) DEFAULT 0,
  avg_response_time_ms INTEGER DEFAULT 0,
  last_checked_at TIMESTAMP DEFAULT NOW(),
  last_success_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Admin metadata overrides/edits
CREATE TABLE school_metadata_edits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  edited_by UUID NOT NULL,
  field_name VARCHAR(100) NOT NULL,
  old_value TEXT,
  new_value TEXT,
  reason TEXT,
  approved BOOLEAN DEFAULT FALSE,
  approved_by UUID,
  approved_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_edits_school (school_id),
  INDEX idx_edits_status (approved)
);

-- Enable row-level security
ALTER TABLE poster_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE poster_jobs ENABLE ROW LEVEL SECURITY;

-- Create policies for row-level security
CREATE POLICY "Users can only see their own requests" ON poster_requests
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can only see jobs for their requests" ON poster_jobs
  FOR SELECT USING (
    request_id IN (
      SELECT id FROM poster_requests WHERE user_id = auth.uid()
    )
  );

-- Create indexes for common queries
CREATE INDEX idx_schools_search ON schools USING GIN (to_tsvector('english', name || ' ' || COALESCE(nickname, '')));
CREATE INDEX idx_poster_requests_recent ON poster_requests (created_at DESC) WHERE status != 'completed';
CREATE INDEX idx_audit_by_date ON audit_logs (created_at DESC);
