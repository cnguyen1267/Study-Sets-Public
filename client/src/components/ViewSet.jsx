import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function ViewSet() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:4000/set/${id}`)
      .then(response => setFlashcards(response.data.data))
      .catch(error => console.error('Error fetching flashcards:', error));
  }, [id]);

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % flashcards.length);
    setIsFlipped(false);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    setIsFlipped(false);
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  if (flashcards.length === 0) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Flashcard Set</h1>
        
        {/* Flashcard Viewer */}
        <div className="mb-12">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-8">
              <div className="mb-4 text-sm text-gray-600 text-center">Card {currentCard + 1} of {flashcards.length}</div>
              <div 
                className="bg-gray-50 p-6 rounded-lg mb-4 min-h-[200px] flex items-center justify-center cursor-pointer transform transition-transform duration-500 perspective-1000"
                style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                onClick={flipCard}
              >
                <div className="absolute backface-hidden" style={{ backfaceVisibility: 'hidden' }}>
                  <p className="text-xl font-semibold text-center">{flashcards[currentCard].front}</p>
                </div>
                <div className="absolute backface-hidden" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                  <p className="text-xl font-semibold text-center">{flashcards[currentCard].back}</p>
                </div>
              </div>
              <div className="flex justify-between">
                <button 
                  onClick={prevCard}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300 transition duration-300"
                >
                  Previous
                </button>
                <button 
                  onClick={nextCard}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300 transition duration-300"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Flashcard List View */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">All Flashcards</h2>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Front</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Back</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {flashcards.map((card, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-normal">{card.front}</td>
                    <td className="px-6 py-4 whitespace-normal">{card.back}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}