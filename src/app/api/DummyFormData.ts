export const DummyFormData = [
  {
    id: 1,
    title: "Test Form Creation",
    description: "Nice Description",
    fields: [
      {
        field_id: 1,
        question_name: "Select Question",
        question_type: "select",
        question: "Placeholder Question",
        required_field: true,
        choices: ["Option 1", "Option 2"],
      },
      {
        field_id: 2,
        question_name: "New Question 2",
        question_type: "textarea",
        question: "Who Are you?",
        required_field: false,
        choices: [],
      },
      {
        field_id: 3,
        question_name: "New Question 3",
        question_type: "range",
        question: "Who Are you?",
        required_field: false,
        choices: [],
        minimum: 1,
        maximum: 10,
      },
    ],
  },
];
