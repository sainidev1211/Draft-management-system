import { useState } from 'react';
import '../styles/DraftManager.css';

/**
 * DraftManager Component
 * Main container managing draft CRUD operations
 */
const DraftManager = ({
  children,
  onApiCall,
  isLoading = false,
  error = null,
  successMessage = null,
}) => {
  return (
    <div className="draft-manager">
      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
          <button 
            className="alert-close"
            onClick={() => onApiCall(null)}
          >
            ×
          </button>
        </div>
      )}

      {successMessage && (
        <div className="alert alert-success">
          <span>{successMessage}</span>
          <button 
            className="alert-close"
            onClick={() => onApiCall(null)}
          >
            ×
          </button>
        </div>
      )}

      {isLoading && (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      )}

      {children}
    </div>
  );
};

export default DraftManager;
