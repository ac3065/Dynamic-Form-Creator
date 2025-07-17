# Dynamic Form Creator

A powerful React.js application that dynamically renders forms from JSON schema configuration. Built with TypeScript, Tailwind CSS, and modern React patterns.

## Features

- **Dynamic Form Rendering**: Generate forms from JSON schema without any hardcoded fields
- **Real-time Validation**: Instant feedback as users type with regex, required, min/max validation
- **Nested Forms**: Support for card-type fields that contain sub-forms (recursive rendering)
- **File Uploads**: Handle file uploads with custom API endpoints, methods, and headers
- **Multiple Field Types**: Support for text, email, number, select, multiselect, buttons, textarea, tel, date, datetime, file, and card fields
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **TypeScript**: Full type safety throughout the application
- **Clean Architecture**: Well-structured components with separation of concerns

## Supported Field Types

| Type | Description | Features |
|------|-------------|----------|
| `text` | Standard text input | Regex validation, min/max length |
| `email` | Email input with validation | Built-in email validation |
| `number` | Numeric input | Min/max values, step resolution |
| `textarea` | Multi-line text input | Character limits |
| `tel` | Phone number input | Custom validation patterns |
| `date` | Date picker | Min/max date constraints |
| `datetime` | Date and time picker | Full datetime validation |
| `select` | Dropdown selection | Single selection from options |
| `multiselect` | Multiple selection dropdown | Multiple values selection |
| `buttons` | Button group selection | Visual button-based selection |
| `file` | File upload | Custom upload endpoints with headers |
| `card` | Nested form container | Recursive sub-form rendering |

## Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Quick Start

1. **Clone or download the project**
   ```bash
   # If you have the project as a zip file, extract it
   # If you have access to the source, clone it
   cd dynamic-form-creator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## JSON Schema Format

Each form field follows this structure:

```json
{
  "title": "Field Label",
  "name": "fieldName",
  "type": "text|email|number|select|multiselect|buttons|textarea|tel|date|datetime|file|card",
  "placeholder": "Placeholder text",
  "required": true,
  "validator": "^[a-zA-Z]+$",
  "min": 5,
  "max": 100,
  "resolution": 1,
  "value": "default value",
  "error": "Custom error message",
  "data": "Field-specific data (options, sub-forms, upload config)"
}
```

### Field-Specific Data Examples

**Select/Multiselect/Buttons:**
```json
"data": [
  { "id": "option1", "title": "Option 1" },
  { "id": "option2", "title": "Option 2" }
]
```

**File Upload:**
```json
"data": {
  "url": "https://api.example.com/upload",
  "method": "POST",
  "headers": {
    "Authorization": "Bearer token"
  }
}
```

**Card (Nested Form):**
```json
"data": [
  {
    "title": "Sub Field",
    "name": "subField",
    "type": "text",
    "required": true
  }
]
```

## Project Structure

```
src/
├── components/
│   ├── FormRenderer.tsx        # Main form logic and submission
│   ├── FieldRenderer.tsx       # Field type routing
│   └── fields/
│       ├── TextInput.tsx       # Text-based inputs
│       ├── SelectInput.tsx     # Select and button inputs
│       ├── FileInput.tsx       # File upload handling
│       ├── DateInput.tsx       # Date and datetime inputs
│       └── CardField.tsx       # Nested form rendering
├── types/
│   └── form.ts                 # TypeScript definitions
├── utils/
│   └── validation.ts           # Validation logic
├── data/
│   └── sampleForms.ts          # Example form configurations
├── App.tsx                     # Main application component
├── main.tsx                    # React entry point
└── index.css                   # Tailwind CSS imports
```

## Usage Examples

### Basic Form

```typescript
const schema = [
  {
    title: "Full Name",
    name: "fullName",
    type: "text",
    required: true,
    placeholder: "Enter your full name"
  },
  {
    title: "Email",
    name: "email",
    type: "email",
    required: true,
    validator: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
  }
];
```

### Form with Nested Card

```typescript
const schema = [
  {
    title: "Personal Info",
    name: "personal",
    type: "card",
    required: true,
    data: [
      {
        title: "First Name",
        name: "firstName",
        type: "text",
        required: true
      },
      {
        title: "Last Name",
        name: "lastName",
        type: "text",
        required: true
      }
    ]
  }
];
```

### Form with File Upload

```typescript
const schema = [
  {
    title: "Resume",
    name: "resume",
    type: "file",
    required: true,
    data: {
      url: "https://your-api.com/upload",
      method: "POST",
      headers: {
        "Authorization": "Bearer your-token"
      }
    }
  }
];
```

## Validation Features

- **Required Fields**: Set `required: true` to make fields mandatory
- **Regex Validation**: Use `validator` property for custom patterns
- **Min/Max Constraints**: Set limits for numbers, dates, and text length
- **Real-time Validation**: Immediate feedback as users type
- **Custom Error Messages**: Define specific error messages per field

## Customization

### Adding New Field Types

1. Create a new component in `src/components/fields/`
2. Add the field type to the `FormField` type in `src/types/form.ts`
3. Add a case in `FieldRenderer.tsx` to handle the new type
4. Update validation logic in `src/utils/validation.ts` if needed

### Styling

The application uses Tailwind CSS for styling. You can customize the appearance by:

- Modifying Tailwind classes in components
- Updating the `tailwind.config.js` file
- Adding custom CSS in `src/index.css`

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for personal or commercial purposes.

---

**Happy form building!** 🚀