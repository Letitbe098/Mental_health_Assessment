import React from 'react';
import { ExerciseRecommendation } from '../models/exerciseTypes';
import { motion } from 'framer-motion';

interface ExerciseGalleryProps {
  exercises: ExerciseRecommendation[];
}

const ExerciseGallery: React.FC<ExerciseGalleryProps> = ({ exercises }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {exercises.map((exercise, index) => (
        <motion.div
          key={index}
          className="bg-white rounded-lg shadow-md overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <img
            src={exercise.img}
            alt={exercise.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{exercise.name}</h3>
            <p className="text-sm text-gray-600">
              Recommended duration: {exercise.duration}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ExerciseGallery;
