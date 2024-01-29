export const DummyFormData = [
   {
      id: "1",
      title: "Test Form Creation",
      description: "Nice Description",
      fields: [
         {
            question_name: "Select Question",
            question_type: "select",
            question: "Placeholder Question",
            choices: [
               "Option 1", 
               "Option 2"
            ],
            required_field: true
         },
         {
            question_name: "New Question 2",
            question_type: "textarea",
            question: "Who Are you?",
            required_field: false
         },
         {
            question_name: "New Question 3",
            question_type: "range",
            question: "Who Are you?",
            minimum: 0,
            maximum: 10,
            required_field: false
         }
      ],
   },
];
