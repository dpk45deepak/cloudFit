
import React from 'react';
import { AppStep } from '../types';

interface StepIndicatorProps {
  currentStep: AppStep;
}

const steps = [
  { id: AppStep.Profile, label: 'Your Profile' },
  { id: AppStep.Context, label: 'Occasion' },
  { id: AppStep.Results, label: 'Recommendations' },
];

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  return (
    <nav aria-label="Progress" className="mt-12 mb-8">
      <ol role="list" className="flex items-center justify-center space-x-4">
        {steps.map((step, index) => (
          <li key={step.label} className="flex-1">
            {index < currentStepIndex ? (
              <div className="group flex w-full flex-col border-l-4 border-indigo-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-sm font-medium text-indigo-600 transition-colors ">{`0${index + 1}`}</span>
                <span className="text-sm font-medium text-slate-300">{step.label}</span>
              </div>
            ) : index === currentStepIndex ? (
              <div className="flex w-full flex-col border-l-4 border-indigo-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4" aria-current="step">
                <span className="text-sm font-medium text-indigo-600">{`0${index + 1}`}</span>
                <span className="text-sm font-medium text-white">{step.label}</span>
              </div>
            ) : (
              <div className="group flex w-full flex-col border-l-4 border-gray-700 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-sm font-medium text-gray-500 transition-colors">{`0${index + 1}`}</span>
                <span className="text-sm font-medium text-slate-500">{step.label}</span>
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default StepIndicator;
