import { useState } from 'react';
import '../styles/DraftForm.css';

/**
 * DraftForm Component
 * Form to create and edit drafts
 */
const DraftForm = ({ onSubmit, initialData = null, isLoading = false }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    content: initialData?.content || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() && !formData.content.trim()) {
      alert('Please enter a title or content');
      return;
    }

    onSubmit(formData);
    
    // Reset form if creating new draft
    if (!initialData) {
      setFormData({ title: '', content: '' });
    }
  };

  return (
    <form className="draft-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Draft Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Enter draft title"
          disabled={isLoading}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleInputChange}
          placeholder="Write your draft content here..."
          disabled={isLoading}
          className="form-textarea"
          rows="8"
        />
      </div>

      <button 
        type="submit" 
        className="btn btn-primary"
        disabled={isLoading}
      >
        {isLoading ? 'Saving...' : initialData ? 'Update Draft' : 'Save Draft'}
      </button>
    </form>
  );
};

export default DraftForm;
