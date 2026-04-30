# Backend Endpoints - Stage 3 Specification

## Base URLs

- **Backend URL**: `http://localhost:5000`
- **Auth Endpoints**: `http://localhost:5000/auth/*` (no `/api` prefix)
- **Profile Endpoints**: `http://localhost:5000/api/*` (with `X-API-Version: 1` header)

## Authentication Endpoints

### 1. Initiate GitHub OAuth
**Endpoint**: `GET /auth/github`

**Purpose**: Start the GitHub OAuth flow

**Flow**:
1. Frontend redirects user to this endpoint
2. Backend redirects to GitHub OAuth page
3. User authenticates on GitHub
4. GitHub redirects back to `/auth/github/callback`

**Example**:
```javascript
window.location.href = "http://localhost:5000/auth/github";
```

### 2. GitHub OAuth Callback
**Endpoint**: `GET /auth/github/callback?code=XXX&state=YYY`

**Purpose**: Handle GitHub's OAuth callback

**Request**:
- Query Parameters:
  - `code` (string): Authorization code from GitHub
  - `state` (string): CSRF state token

**Response** (Sets HTTP-only cookies):
```json
{
  "status": "success",
  "message": "Logged in successfully",
  "user": {
    "id": "uuid",
    "username": "github_username",
    "email": "user@example.com",
    "avatar_url": "https://...",
    "role": "analyst"
  }
}
```

**HTTP-only Cookies Set**:
- `accessToken`: 3-minute expiry
- `refreshToken`: 5-minute expiry

### 3. Refresh Token
**Endpoint**: `POST /auth/refresh`

**Purpose**: Refresh access token using refresh token

**Request**:
```json
{}
```

**Response**:
```json
{
  "status": "success",
  "message": "Token refreshed successfully"
}
```

**Note**: Old refresh token is invalidated. New cookies are set.

### 4. Logout
**Endpoint**: `POST /auth/logout`

**Purpose**: Invalidate refresh token and end session

**Request**:
```json
{}
```

**Response**:
```json
{
  "status": "success",
  "message": "Logged out successfully"
}
```

## Profile Endpoints

### 1. List Profiles
**Endpoint**: `GET /api/profiles?page=1&limit=10&gender=male&country=NG`

**Headers Required**:
- `X-API-Version: 1`

**Query Parameters**:
- `page` (int): Page number
- `limit` (int): Results per page
- `gender` (string): Filter by gender
- `country` (string): Filter by country
- `age-group` (string): Filter by age group
- `min-age` (int): Minimum age
- `max-age` (int): Maximum age
- `sort-by` (string): Sort field
- `order` (asc|desc): Sort order

**Response**:
```json
{
  "status": "success",
  "page": 1,
  "limit": 10,
  "total": 2026,
  "total_pages": 203,
  "links": {
    "self": "/api/profiles?page=1&limit=10",
    "next": "/api/profiles?page=2&limit=10",
    "prev": null
  },
  "data": [
    {
      "id": "uuid",
      "name": "John Doe",
      "gender": "male",
      "gender_probability": 0.95,
      "age": 28,
      "age_group": "adult",
      "country_id": "US",
      "country_name": "United States",
      "country_probability": 0.89,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### 2. Get Profile Detail
**Endpoint**: `GET /api/profiles/:id`

**Headers Required**:
- `X-API-Version: 1`

**Response**:
```json
{
  "status": "success",
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "gender": "male",
    "gender_probability": 0.95,
    "age": 28,
    "age_group": "adult",
    "country_id": "US",
    "country_name": "United States",
    "country_probability": 0.89,
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

### 3. Create Profile (Admin Only)
**Endpoint**: `POST /api/profiles`

**Headers Required**:
- `X-API-Version: 1`
- `Content-Type: application/json`

**Request**:
```json
{
  "name": "Harriet Tubman"
}
```

**Response**:
```json
{
  "status": "success",
  "data": {
    "id": "uuid",
    "name": "Harriet Tubman",
    "gender": "female",
    "gender_probability": 0.97,
    "age": 28,
    "age_group": "adult",
    "country_id": "US",
    "country_name": "United States",
    "country_probability": 0.89,
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

### 4. Search Profiles
**Endpoint**: `GET /api/profiles/search?q=young+males+from+nigeria`

**Headers Required**:
- `X-API-Version: 1`

**Query Parameters**:
- `q` (string): Natural language search query

**Response**:
```json
{
  "status": "success",
  "page": 1,
  "limit": 10,
  "total": 150,
  "total_pages": 15,
  "links": {
    "self": "/api/profiles/search?q=young+males+from+nigeria",
    "next": "/api/profiles/search?q=young+males+from+nigeria&page=2",
    "prev": null
  },
  "data": [...]
}
```

### 5. Export Profiles (CSV)
**Endpoint**: `GET /api/profiles/export?format=csv&gender=male&country=NG`

**Headers Required**:
- `X-API-Version: 1`

**Query Parameters**:
- `format` (string): Export format (csv)
- Filter parameters same as list endpoint

**Response**:
- Content-Type: `text/csv`
- Content-Disposition: `attachment; filename="profiles_<timestamp>.csv"`

**CSV Format**:
```
id,name,gender,gender_probability,age,age_group,country_id,country_name,country_probability,created_at
uuid,John Doe,male,0.95,28,adult,US,United States,0.89,2024-01-01T00:00:00Z
```

## Error Responses

All endpoints follow this error format:

```json
{
  "status": "error",
  "message": "Error description"
}
```

### Common HTTP Status Codes

- `200 OK`: Success
- `400 Bad Request`: Invalid request (missing X-API-Version header, etc.)
- `401 Unauthorized`: Not authenticated or token expired
- `403 Forbidden`: Authenticated but not authorized (insufficient role)
- `404 Not Found`: Resource not found
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error

### Rate Limiting

- Auth endpoints: 10 requests/minute
- Other endpoints: 60 requests/minute per user

Response includes headers:
- `X-RateLimit-Limit`: Total limit
- `X-RateLimit-Remaining`: Requests remaining
- `X-RateLimit-Reset`: Timestamp when limit resets

## Implementation Notes

### Frontend (Web Portal)

1. **Login Flow**:
   - Click "Continue with GitHub" → redirect to `/auth/github`
   - Backend handles GitHub OAuth
   - Backend redirects to callback page with `code` parameter
   - Frontend exchanges code at `/auth/github/callback`
   - HTTP-only cookies are set
   - User is redirected to dashboard

2. **API Calls**:
   - Always include `credentials: "include"` in fetch options
   - For profile endpoints, include `X-API-Version: 1` header
   - Never try to access tokens from JavaScript (HTTP-only)

3. **Token Refresh**:
   - If GET request returns 401, attempt to refresh via `POST /auth/refresh`
   - If refresh succeeds, retry original request
   - If refresh fails, redirect to login

4. **Error Handling**:
   - Check `response.ok` or `response.status`
   - All error responses follow standard format
   - Handle 429 rate limit errors gracefully

### API Handler Example

```typescript
const api = async (endpoint: string, options: RequestInit = {}) => {
  const baseUrl = endpoint.startsWith("/auth") 
    ? "http://localhost:5000/auth" 
    : "http://localhost:5000/api";
  
  const headers = new Headers(options.headers || {});
  if (endpoint.startsWith("/profiles")) {
    headers.set("X-API-Version", "1");
  }
  
  const res = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers,
    credentials: "include",
  });
  
  return res.json();
};
```
