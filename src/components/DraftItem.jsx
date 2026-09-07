import '../styles/DraftItem.css';

/**
 * DraftItem Component
 * Displays individual draft with options to edit, delete, and publish
 */
const DraftItem = ({
  draft,
  onEdit,
  onDelete,
  onPublish,
  isLoading = false,
}) => {
  const createdDate = new Date(draft.createdAt).toLocaleDateString();
  const updatedDate = new Date(draft.updatedAt).toLocaleDateString();
  const contentPreview = draft.content.substring(0, 100) + (draft.content.length > 100 ? '...' : '');

  return (
    <div className="draft-item">
      <div className="draft-header">
        <h3 className="draft-title">{draft.title || 'Untitled Draft'}</h3>
        <span className="draft-id">ID: {draft.id}</span>
      </div>

      <p className="draft-preview">{contentPreview || 'No content'}</p>

      <div className="draft-metadata">
        <span className="draft-date">Created: {createdDate}</span>
        <span className="draft-date">Updated: {updatedDate}</span>
      </div>

      <div className="draft-actions">
        <button
          className="btn btn-secondary"
          onClick={() => onEdit(draft)}
          disabled={isLoading}
        >
          Edit
        </button>
        <button
          className="btn btn-success"
          onClick={() => onPublish(draft.id)}
          disabled={isLoading}
        >
          Publish
        </button>
        <button
          className="btn btn-danger"
          onClick={() => {
            if (confirm('Are you sure you want to delete this draft?')) {
              onDelete(draft.id);
            }
          }}
          disabled={isLoading}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DraftItem;
