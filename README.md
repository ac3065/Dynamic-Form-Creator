### 📄 `README.md`

```markdown
# Dynamic Form Creator 🧩

A fully dynamic and recursive form builder built using TypeScript and Tailwind CSS. This application renders forms from a given JSON schema and supports real-time validation, nested forms, and file uploads.

---

## 🚀 Live Demo
🌐 [Click to Visit](https://regal-semolina-e0d11f.netlify.app/)

---

## 📌 Features

- 🔧 **Fully dynamic**: Renders all forms from JSON schema (no hardcoded fields)
- 🔄 **Supports multiple field types**: text, email, tel, number, select, multiselect, textarea, date, datetime, file
- 📦 **Nested form support**: Create recursive "card"-type sections within the form
- ⚠️ **Validation engine**: Required, min/max, regex, type-based checks
- 📁 **File upload**: Integrated with custom API endpoint
- 🧪 **Live JSON output**: Form data displayed in structured JSON after submission
- 📱 **Responsive UI**: Built with Tailwind for mobile-first design

---

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS
- **Form Handling**: React Hooks, Recursive Components
- **Validation**: Manual logic + regex from schema
- **Deployment**: Netlify

---

## 📂 Folder Structure

```

src/
├── components/
│   ├── DynamicForm/
│   │   ├── FieldRenderer.tsx
│   │   ├── FormCard.tsx
│   └── ...
├── utils/
│   ├── validationHelpers.ts
│   ├── jsonSchema.ts
├── App.tsx
└── main.tsx

````

---

## 📸 Screenshots

<img src="screenshots/form-main.png" width="600"/>
<img src="screenshots/form-nested.png" width="600"/>
<img src="screenshots/form-output.png" width="600"/>

---

## 🧪 How to Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/dynamic-form-creator.git

# 2. Navigate into the project
cd dynamic-form-creator

# 3. Install dependencies
npm install

# 4. Run the project
npm run dev
````


**Alok Chauhan**
Roll No: 2210303153
Invertis University

