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
            choices: [],
            required_field: false
         }
      ],
   },
];
