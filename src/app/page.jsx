"use client"
import React, { useState } from 'react';
import data from '@/data/Data.json';

// Simulate a server function to save data
const saveDataOnServer = (updatedData) => {
  // In a real-world scenario, you would make a network request to the server to save the data.
  // For this example, we'll just log the data as if it's saved on the server.
  console.log('Data saved on the server:', updatedData);
};

export default function Page(params) {
  const [editedData, setEditedData] = useState([...data.items]); // State to store edited data

  // Function to handle question edits
  const handleQuestionEdit = (index, editedQuestion) => {
    const updatedData = [...editedData];
    updatedData[index].question = editedQuestion;
    setEditedData(updatedData);
  };

  // Function to save edited data to JSON
  const handleSave = () => {
    // Update your JSON file with the editedData
    const updatedJSON = { items: editedData };

    // Simulate saving data on the server
    saveDataOnServer(updatedJSON);
  };

  return (
    <div>
      <h1>Items List</h1>
      <ul>
        {editedData.map((item, index) => (
          <li key={index}>
            <input
              type="text"
              value={item.question}
              onChange={(e) => handleQuestionEdit(index, e.target.value)}
            />
            {item.type === 'select' ? (
              <select required={item.require}>
                {item.options.map((option, optionIndex) => (
                  <option key={optionIndex}>{option}</option>
                ))}
              </select>
            ) : (
              <input type={item.type} required={item.require} />
            )}
          </li>
        ))}
      </ul>
      <button onClick={handleSave}>Save</button>
    </div>
  );
}
