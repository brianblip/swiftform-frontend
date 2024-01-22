export const DummyFormData = [
   {
      id: 1,
      title: "Subscription",
      description: "This is a sample description.",
      fields: [
         {
            name: "name",
            type: "text",
            label: "Name",
            placeholder: "Enter your name",
            required: true,
            maxLength: 50,
         },
         {
            name: "email",
            type: "email",
            label: "Email",
            placeholder: "Enter your email",
            required: true,
         },
         {
            name: "password",
            type: "password",
            label: "Password",
            placeholder: "Enter your password",
            required: true,
            minLength: 8,
         },
         {
            name: "gender",
            type: "select",
            label: "Gender",
            options: ["Male", "Female", "Other"],
         }
      ],
   },
   {
      id: 2,
      title: "Feedback",
      description: "Provide your feedback below.",
      fields: [
         {
            name: "rating",
            type: "number",
            label: "Rating",
            placeholder: "Enter your rating (1-5)",
            required: true,
            min: 1,
            max: 5,
         },
         {
            name: "comment",
            type: "textarea",
            label: "Comment",
            placeholder: "Enter your comments here",
            required: true,
            maxLength: 200,
         },
         {
            name: "feedbackType",
            type: "radio",
            label: "Feedback Type",
            options: ["Bug Report", "Feature Request", "General Feedback"],
            required: true,
         },
         {
            name: "contactPreference",
            type: "radio",
            label: "Contact Preference",
            options: ["Email", "Phone", "No Preference"],
         },
      ],
   },
];
