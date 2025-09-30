# 🎨 Frontend Repository Info

## 📝 Short Description

```
Course management web app built with Angular 20 and Material Design, featuring dynamic forms, pagination, and reactive programming
```

---

## 🏷️ Topics/Tags

```
angular
typescript
angular-material
rxjs
frontend
crud
spa
material-design
reactive-forms
```

---

# 📖 README.md - Frontend

```markdown
# 🎓 Course Management Web App

A modern web application built with Angular 20 for managing online courses and lessons, featuring a responsive Material Design interface and comprehensive CRUD operations.

[![Angular](https://img.shields.io/badge/Angular-20.1.3-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Material](https://img.shields.io/badge/Material-Latest-purple.svg)](https://material.angular.io/)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Components](#-components)
- [API Integration](#-api-integration)
- [Styling](#-styling)
- [Contributing](#-contributing)

## ✨ Features

- ✅ Complete CRUD operations for courses and lessons
- ✅ Dynamic form arrays for managing multiple lessons
- ✅ Real-time form validation with visual feedback
- ✅ Server-side pagination with customizable page size
- ✅ Responsive Material Design interface
- ✅ Category-based icons and filtering
- ✅ Soft delete with status management
- ✅ Success/Error dialog notifications
- ✅ Reactive programming with RxJS
- ✅ Type-safe HTTP communication

## 🛠️ Tech Stack

- **Angular** 20.1.3 - Frontend framework
- **TypeScript** 5.8.3 - Programming language
- **Angular Material** - UI component library
- **RxJS** - Reactive programming
- **Angular Router** - Navigation
- **Reactive Forms** - Form management
- **HttpClient** - API communication

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Angular CLI 20.1.3
- Backend API running on `http://localhost:8080`

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/camilagksantos/course-crud-angular.git
   cd course-crud-angular
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   ng serve
   ```

4. **Access the application**
   ```
   http://localhost:4200
   ```

### Build for Production

```bash
ng build --configuration production
```

Build artifacts will be stored in the `dist/` directory.

## 📁 Project Structure

```
src/
├── app/
│   ├── courses/
│   │   ├── components/
│   │   │   ├── courses/              # Course list component
│   │   │   └── course-form/          # Course create/edit form
│   │   ├── guards/                   # Route guards
│   │   ├── model/                    # TypeScript interfaces
│   │   ├── pipes/                    # Custom pipes
│   │   ├── resolvers/                # Route resolvers
│   │   └── services/                 # API services
│   ├── shared/
│   │   └── components/
│   │       ├── error-dialog/         # Error notifications
│   │       └── success-dialog/       # Success notifications
│   └── app-routing.module.ts
├── assets/                           # Static assets
└── styles.scss                       # Global styles
```

## 🧩 Components

### CoursesComponent

Main component for listing courses with pagination.

**Features:**
- Server-side pagination with MatPaginator
- Dynamic page size selection (5, 10, 25, 50)
- Edit and delete actions
- Navigation to course form
- Material Design table layout

**Key Methods:**
```typescript
loadCourses()       // Fetch paginated courses
onPageChange()      // Handle pagination events
onEdit(course)      // Navigate to edit form
onDelete(course)    // Soft delete course
```

### CourseFormComponent

Dynamic form for creating and editing courses with lessons.

**Features:**
- Reactive Forms with FormArray
- Dynamic lesson management (add/remove)
- Recursive form validation
- Pre-populated data for editing
- Category dropdown with 10 options

**Key Methods:**
```typescript
addLesson()                 // Add new lesson to form
removeLesson(index)         // Remove lesson from form
validateAllFormFields()     // Mark all fields as touched
onSubmit()                  // Save course with lessons
```

### Form Validation Rules

**Course:**
- Name: 5-100 characters, required
- Category: required selection

**Lesson:**
- Name: 3-100 characters, required
- YouTube URL: exactly 11 characters, required

## 🔌 API Integration

### CoursesService

Main service for backend communication.

**Endpoints:**
```typescript
list(params)                    // GET /api/courses (paginated)
listWithLessons(params)         // GET /api/courses/with-lessons
loadById(id)                    // GET /api/courses/{id}
save(course)                    // POST/PUT /api/courses
remove(id)                      // DELETE /api/courses/{id}
```

**Response Format:**
```typescript
interface PageResponse<T> {
  content: T[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}
```

## 🎨 Styling

### Design System

**Color Palette:**
- Primary: `#2196f3` (Material Blue)
- Accent: `#ff4081` (Material Pink)
- Background: `#f8f9fa` (Light Gray)
- Surface: `#ffffff` (White)

**Typography:**
- Main toolbar: 500 weight, 56px height
- Lesson toolbar: 400 weight, 44px height
- Body: Roboto, 14px

**Components:**
```scss
// Toolbar
.course-toolbar {
  background: #2196f3;
  font-weight: 500;
  height: 56px;
}

// Lesson cards
.lesson-card {
  background: #f8f9fa;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
}

// Paginator
.mat-mdc-paginator {
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

### Category Icons

Categories mapped to Material Icons:

| Category | Icon | Color |
|----------|------|-------|
| Frontend | `code` | Blue |
| Backend | `developer_board` | Green |
| Data Science | `bar_chart` | Purple |
| DevOps | `hub` | Orange |
| Database | `storage` | Teal |
| Mobile | `smartphone` | Pink |
| Cloud | `cloud` | Cyan |
| Security | `security` | Red |
| Design | `palette` | Indigo |
| Testing | `bug_report` | Amber |

## 🔧 Configuration

### Environment Variables

Create `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

For production (`environment.prod.ts`):

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-api-url.com/api'
};
```

### Proxy Configuration

For local development, create `proxy.conf.json`:

```json
{
  "/api": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true
  }
}
```

Run with proxy:
```bash
ng serve --proxy-config proxy.conf.json
```

## 🧪 Testing

### Run Unit Tests
```bash
ng test
```

### Run E2E Tests
```bash
ng e2e
```

### Test Coverage
```bash
ng test --code-coverage
```

Coverage report: `coverage/index.html`

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Mobile**: < 600px
- **Tablet**: 600px - 960px
- **Desktop**: > 960px

Material Design components automatically adapt to screen sizes.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
