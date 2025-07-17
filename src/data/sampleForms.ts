import { FormSchema } from '../types/form';

export const sampleFormConfigs: FormSchema[] = [
  {
    name: "User Registration",
    schema: [
      {
        title: "First Name",
        name: "firstName",
        type: "text",
        placeholder: "Enter your first name",
        required: true,
        validator: "^[a-zA-Z\\s]{2,50}$",
        error: "First name must contain only letters and be 2-50 characters long"
      },
      {
        title: "Last Name",
        name: "lastName",
        type: "text",
        placeholder: "Enter your last name",
        required: true,
        validator: "^[a-zA-Z\\s]{2,50}$",
        error: "Last name must contain only letters and be 2-50 characters long"
      },
      {
        title: "Email Address",
        name: "email",
        type: "email",
        placeholder: "Enter your email",
        required: true,
        validator: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
        error: "Please enter a valid email address"
      },
      {
        title: "Phone Number",
        name: "phone",
        type: "tel",
        placeholder: "Enter your phone number",
        required: true,
        validator: "^\\+?[1-9]\\d{1,14}$",
        error: "Please enter a valid phone number"
      },
      {
        title: "Age",
        name: "age",
        type: "number",
        placeholder: "Enter your age",
        required: true,
        min: 18,
        max: 120,
        error: "Age must be between 18 and 120"
      },
      {
        title: "Gender",
        name: "gender",
        type: "select",
        required: true,
        data: [
          { id: "male", title: "Male" },
          { id: "female", title: "Female" },
          { id: "other", title: "Other" },
          { id: "prefer-not-to-say", title: "Prefer not to say" }
        ]
      },
      {
        title: "Bio",
        name: "bio",
        type: "textarea",
        placeholder: "Tell us about yourself",
        max: 500,
        error: "Bio must be less than 500 characters"
      }
    ]
  },
  {
    name: "Job Application",
    schema: [
      {
        title: "Position Applied For",
        name: "position",
        type: "select",
        required: true,
        data: [
          { id: "developer", title: "Software Developer" },
          { id: "designer", title: "UI/UX Designer" },
          { id: "manager", title: "Project Manager" },
          { id: "analyst", title: "Data Analyst" }
        ]
      },
      {
        title: "Experience Level",
        name: "experience",
        type: "buttons",
        required: true,
        data: [
          { id: "entry", title: "Entry Level (0-2 years)" },
          { id: "mid", title: "Mid Level (3-5 years)" },
          { id: "senior", title: "Senior Level (5+ years)" }
        ]
      },
      {
        title: "Skills",
        name: "skills",
        type: "multiselect",
        required: true,
        data: [
          { id: "javascript", title: "JavaScript" },
          { id: "react", title: "React" },
          { id: "nodejs", title: "Node.js" },
          { id: "python", title: "Python" },
          { id: "sql", title: "SQL" },
          { id: "aws", title: "AWS" }
        ]
      },
      {
        title: "Resume",
        name: "resume",
        type: "file",
        required: true,
        placeholder: "Upload your resume (PDF, DOC, DOCX)",
        data: {
          url: "https://httpbin.org/post",
          method: "POST",
          headers: {
            "Authorization": "Bearer sample-token"
          }
        }
      },
      {
        title: "Available Start Date",
        name: "startDate",
        type: "date",
        required: true,
        min: "2025-01-01"
      },
      {
        title: "Expected Salary",
        name: "salary",
        type: "number",
        placeholder: "Enter expected salary",
        required: true,
        min: 30000,
        max: 200000,
        error: "Salary must be between $30,000 and $200,000"
      },
      {
        title: "Personal Information",
        name: "personal",
        type: "card",
        required: true,
        data: [
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
            placeholder: "Enter your email"
          },
          {
            title: "LinkedIn Profile",
            name: "linkedin",
            type: "text",
            placeholder: "Enter your LinkedIn URL",
            validator: "^https://www\\.linkedin\\.com/.*$",
            error: "Please enter a valid LinkedIn URL"
          }
        ]
      }
    ]
  },
  {
    name: "Event Registration",
    schema: [
      {
        title: "Event Type",
        name: "eventType",
        type: "buttons",
        required: true,
        data: [
          { id: "workshop", title: "Workshop" },
          { id: "conference", title: "Conference" },
          { id: "seminar", title: "Seminar" }
        ]
      },
      {
        title: "Attendee Name",
        name: "attendeeName",
        type: "text",
        required: true,
        placeholder: "Enter attendee name"
      },
      {
        title: "Registration Date & Time",
        name: "registrationDateTime",
        type: "datetime",
        required: true,
        min: "2025-01-01T00:00"
      },
      {
        title: "Dietary Restrictions",
        name: "dietary",
        type: "multiselect",
        data: [
          { id: "vegetarian", title: "Vegetarian" },
          { id: "vegan", title: "Vegan" },
          { id: "gluten-free", title: "Gluten-free" },
          { id: "dairy-free", title: "Dairy-free" },
          { id: "none", title: "None" }
        ]
      },
      {
        title: "Special Requirements",
        name: "requirements",
        type: "textarea",
        placeholder: "Any special requirements or accommodations needed",
        max: 300
      },
      {
        title: "Emergency Contact",
        name: "emergency",
        type: "card",
        required: true,
        data: [
          {
            title: "Contact Name",
            name: "name",
            type: "text",
            required: true,
            placeholder: "Emergency contact name"
          },
          {
            title: "Contact Phone",
            name: "phone",
            type: "tel",
            required: true,
            placeholder: "Emergency contact phone"
          },
          {
            title: "Relationship",
            name: "relationship",
            type: "select",
            required: true,
            data: [
              { id: "spouse", title: "Spouse" },
              { id: "parent", title: "Parent" },
              { id: "sibling", title: "Sibling" },
              { id: "friend", title: "Friend" },
              { id: "other", title: "Other" }
            ]
          }
        ]
      }
    ]
  },
  {
    name: "Customer Feedback",
    schema: [
      {
        title: "Overall Rating",
        name: "rating",
        type: "buttons",
        required: true,
        data: [
          { id: "1", title: "⭐" },
          { id: "2", title: "⭐⭐" },
          { id: "3", title: "⭐⭐⭐" },
          { id: "4", title: "⭐⭐⭐⭐" },
          { id: "5", title: "⭐⭐⭐⭐⭐" }
        ]
      },
      {
        title: "Service Areas",
        name: "serviceAreas",
        type: "multiselect",
        required: true,
        data: [
          { id: "customer-service", title: "Customer Service" },
          { id: "product-quality", title: "Product Quality" },
          { id: "delivery", title: "Delivery" },
          { id: "pricing", title: "Pricing" },
          { id: "website", title: "Website Experience" }
        ]
      },
      {
        title: "Comments",
        name: "comments",
        type: "textarea",
        placeholder: "Please share your detailed feedback",
        required: true,
        min: 10,
        max: 1000,
        error: "Comments must be between 10 and 1000 characters"
      },
      {
        title: "Would you recommend us?",
        name: "recommend",
        type: "buttons",
        required: true,
        data: [
          { id: "yes", title: "Yes, definitely!" },
          { id: "maybe", title: "Maybe" },
          { id: "no", title: "No" }
        ]
      },
      {
        title: "Contact Information",
        name: "contact",
        type: "card",
        data: [
          {
            title: "Name",
            name: "name",
            type: "text",
            placeholder: "Your name (optional)"
          },
          {
            title: "Email",
            name: "email",
            type: "email",
            placeholder: "Your email (optional)"
          }
        ]
      }
    ]
  }
];