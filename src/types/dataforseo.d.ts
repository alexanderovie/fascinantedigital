/**
 * DataForSEO API TypeScript Type Definitions
 * Basado en la documentación oficial: https://docs.dataforseo.com/
 */

// ============================================
// Base Types
// ============================================

export interface DataForSEOResponse<T = any> {
  version: string;
  status_code: number;
  status_message: string;
  time: string;
  cost: number;
  tasks_count: number;
  tasks_error: number;
  tasks: DataForSEOTask<T>[];
}

export interface DataForSEOTask<T = any> {
  id: string;
  status_code: number;
  status_message: string;
  time: string;
  cost: number;
  result_count: number;
  path: string[];
  data: any;
  result: T[];
}

// ============================================
// OnPage API - Task Post
// ============================================

export interface OnPageTaskPostRequest {
  target: string;
  max_crawl_pages?: number;
  load_resources?: boolean;
  enable_javascript?: boolean;
  enable_browser_rendering?: boolean;
  custom_js?: string;
  tag?: string;
  pingback_url?: string;
}

export interface OnPageTaskPostResult {
  id: string;
  status_code: number;
  status_message: string;
  time: string;
}

// ============================================
// OnPage API - Summary
// ============================================

export interface OnPageSummaryResult {
  crawl_progress: string;
  crawl_status: {
    max_crawl_pages: number;
    pages_in_queue: number;
    pages_crawled: number;
  };
  total_items_count: number;
  items_count: number;
  checks: {
    [key: string]: number;
  };
  pages: {
    [key: string]: number;
  };
  on_page_score: number;
  domain_info: {
    name: string;
    cms: string | null;
    ip: string;
    server: string;
    crawl_start: string;
    crawl_end: string;
    ssl_info: {
      valid_certificate: boolean;
      certificate_issuer: string;
      certificate_subject: string;
      certificate_version: number;
      certificate_hash: string;
      certificate_expiration_date: string;
    };
  };
}

// ============================================
// OnPage API - Pages
// ============================================

export interface OnPagePagesRequest {
  id: string;
  limit?: number;
  offset?: number;
  filters?: any[];
  order_by?: string[];
}

export interface OnPagePageResult {
  crawl_progress: string;
  check_status: {
    [key: string]: string;
  };
  page_metrics: {
    links_internal: number;
    links_external: number;
    duplicate_title: boolean;
    duplicate_description: boolean;
    duplicate_content: boolean;
    click_depth: number;
    size: number;
    encoded_size: number;
    total_transfer_size: number;
    fetch_time: number;
    cache_control: {
      cachable: boolean;
      ttl: number;
    };
    checks: {
      [key: string]: boolean;
    };
    content: {
      plain_text_size: number;
      plain_text_rate: number;
      plain_text_word_count: number;
      automated_readability_index: number;
      coleman_liau_readability_index: number;
      dale_chall_readability_index: number;
      flesch_kincaid_readability_index: number;
      smog_readability_index: number;
      description_to_content_consistency: number;
      title_to_content_consistency: number;
      meta_keywords_to_content_consistency: number;
    };
    resource_errors: {
      errors: number;
      warnings: number;
    };
  };
  meta: {
    title: string;
    charset: number;
    follow: boolean;
    generator: string | null;
    htlang: string | null;
    description: string;
    favicon: string;
    meta_keywords: string;
    canonical: string;
    internal_links_count: number;
    external_links_count: number;
    inbound_links_count: number;
    images_count: number;
    images_size: number;
    scripts_count: number;
    scripts_size: number;
    stylesheets_count: number;
    stylesheets_size: number;
    title_length: number;
    description_length: number;
    content: {
      plain_text_size: number;
      plain_text_rate: number;
      plain_text_word_count: number;
      automated_readability_index: number;
    };
  };
  url: string;
  resource_type: string;
  status_code: number;
  url_length: number;
  relative_url_length: number;
  last_modified: {
    header: string | null;
    sitemap: string | null;
    meta_tag: string | null;
  };
  redirect_chain: string[] | null;
}

// ============================================
// Lighthouse API
// ============================================

export interface LighthouseTaskPostRequest {
  url: string;
  for_mobile?: boolean;
  language_code?: string;
  tag?: string;
  pingback_url?: string;
}

export interface LighthouseResult {
  url: string;
  version: string;
  fetch_time: string;
  audits: {
    [key: string]: LighthouseAudit;
  };
  categories: {
    performance: LighthouseCategory;
    accessibility: LighthouseCategory;
    'best-practices': LighthouseCategory;
    seo: LighthouseCategory;
    pwa: LighthouseCategory;
  };
  total_uncompressed_size: {
    bytesTransferred: number;
    bytesUncompressed: number;
  };
}

export interface LighthouseAudit {
  id: string;
  title: string;
  description: string;
  score: number | null;
  displayValue?: string;
  details?: any;
  scoreDisplayMode: string;
}

export interface LighthouseCategory {
  id: string;
  title: string;
  score: number;
  auditRefs: Array<{
    id: string;
    weight: number;
    group?: string;
  }>;
}

// ============================================
// Custom Types para nuestra aplicación
// ============================================

export interface AuditResult {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  url: string;
  created_at: string;
  completed_at?: string;
  summary?: OnPageSummaryResult;
  lighthouse?: LighthouseResult;
  top_issues?: AuditIssue[];
  recommendations?: AuditRecommendation[];
}

export interface AuditIssue {
  type: 'error' | 'warning' | 'notice';
  category: 'seo' | 'performance' | 'accessibility' | 'mobile' | 'security';
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  affected_urls: string[];
  how_to_fix: string;
}

export interface AuditRecommendation {
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'easy' | 'medium' | 'hard';
  category: string;
}

export interface BusinessInfo {
  name: string;
  email: string;
  website: string;
  businessType: 'local' | 'ecommerce' | 'corporate' | 'blog';
  location?: string;
}
