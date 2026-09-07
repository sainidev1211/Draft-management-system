import DraftItem from './DraftItem';
import '../styles/DraftList.css';

/**
 * DraftList Component
 * Displays list of all saved drafts
 */
const DraftList = ({
  drafts,
  isLoading = false,
  onEdit,
  onDelete,
  onPublish,
  onClearAll,
}) => {
  if (isLoading && drafts.length === 0) {
    return (
      <div className="draft-list">
        <p className="loading-message">Loading drafts...</p>
      </div>
    );
  }

  if (drafts.length === 0) {
    return (
      <div className="draft-list">
        <p className="empty-message">No drafts yet. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div className="draft-list">
      <div className="list-header">
        <h2>Saved Drafts ({drafts.length})</h2>
        <button
          className="btn btn-danger-outline"
          onClick={() => {
            if (confirm('Are you sure you want to delete all drafts?')) {
              onClearAll();
            }
          }}
          disabled={isLoading}
        >
          Clear All
        </button>
      </div>

      <div className="draft-items">
        {drafts.map((draft) => (
          <DraftItem
            key={draft.id}
            draft={draft}
            onEdit={onEdit}
            onDelete={onDelete}
            onPublish={onPublish}
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  );
};

export default DraftList;
