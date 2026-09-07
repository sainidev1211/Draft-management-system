import { useState } from 'react'
import DraftForm from './components/DraftForm'
import DraftList from './components/DraftList'
import DraftManager from './components/DraftManager'
import { useDraftStorage } from './hooks/useDraftStorage'
import {
  mockApiCreateDraft,
  mockApiUpdateDraft,
  mockApiDeleteDraft,
  mockApiPublishDraft,
} from './services/mockApi'
import './App.css'

function App() {
  const {
    drafts,
    isLoading: storageLoading,
    createDraft,
    updateDraft,
    deleteDraft,
    getDraftById,
    clearAllDrafts,
  } = useDraftStorage()

  const [editingDraft, setEditingDraft] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const clearMessages = () => {
    setError(null)
    setSuccessMessage(null)
  }

  const handleSaveDraft = async (formData) => {
    try {
      setIsLoading(true)
      clearMessages()

      if (editingDraft) {
        // Update existing draft
        await mockApiUpdateDraft(editingDraft.id, formData)
        updateDraft(editingDraft.id, formData)
        setSuccessMessage('Draft updated successfully!')
        setEditingDraft(null)
      } else {
        // Create new draft
        await mockApiCreateDraft(formData)
        createDraft(formData.title, formData.content)
        setSuccessMessage('Draft saved successfully!')
      }
    } catch (err) {
      setError(err.message || 'Failed to save draft')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditDraft = (draft) => {
    setEditingDraft(draft)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDeleteDraft = async (id) => {
    try {
      setIsLoading(true)
      clearMessages()
      await mockApiDeleteDraft(id)
      deleteDraft(id)
      setSuccessMessage('Draft deleted successfully!')
    } catch (err) {
      setError(err.message || 'Failed to delete draft')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePublishDraft = async (id) => {
    try {
      setIsLoading(true)
      clearMessages()
      const draft = getDraftById(id)

      if (!draft) {
        throw new Error('Draft not found')
      }

      const result = await mockApiPublishDraft(id)
      deleteDraft(id)
      setSuccessMessage(
        `Draft published successfully! Post ID: ${result.postId}`
      )
    } catch (err) {
      setError(err.message || 'Failed to publish draft')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearAllDrafts = async () => {
    try {
      setIsLoading(true)
      clearMessages()
      clearAllDrafts()
      setEditingDraft(null)
      setSuccessMessage('All drafts cleared!')
    } catch (err) {
      setError('Failed to clear drafts')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setEditingDraft(null)
    clearMessages()
  }

  if (storageLoading) {
    return (
      <div className="app">
        <div className="container">
          <p style={{ textAlign: 'center', marginTop: '2rem' }}>
            Loading your drafts...
          </p>
        </div>
      </div>
    )
  }

  return (
    <DraftManager
      isLoading={isLoading}
      error={error}
      successMessage={successMessage}
      onApiCall={clearMessages}
    >
      <div className="app">
        <div className="container">
          <header className="app-header">
            <div className="header-content">
              <h1>📝 Draft Management System</h1>
              <p className="header-subtitle">
                Save, manage, and publish your post drafts
              </p>
            </div>
          </header>

          <main className="app-main">
            <section className="form-section">
              <div className="section-title">
                {editingDraft ? '✏️ Edit Draft' : '✍️ Create New Draft'}
              </div>
              <DraftForm
                onSubmit={handleSaveDraft}
                initialData={editingDraft}
                isLoading={isLoading}
              />
              {editingDraft && (
                <button
                  className="btn btn-secondary-outline"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  Cancel Editing
                </button>
              )}
            </section>

            <section className="list-section">
              <DraftList
                drafts={drafts}
                isLoading={isLoading}
                onEdit={handleEditDraft}
                onDelete={handleDeleteDraft}
                onPublish={handlePublishDraft}
                onClearAll={handleClearAllDrafts}
              />
            </section>
          </main>

          <footer className="app-footer">
            <p>
              Draft Management System | CO2 - BT2, CO3 - BT3 | Local Storage
              Persistence
            </p>
          </footer>
        </div>
      </div>
    </DraftManager>
  )
}

export default App
