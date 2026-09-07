/**
 * Mock API Service - Simulates backend API calls
 * Useful for developing frontend without backend dependency
 */

/**
 * Simulate an API call with delay
 * @param {number} delay - Delay in milliseconds
 * @returns {Promise<void>}
 */
const simulateNetworkDelay = (delay = 500) => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};

/**
 * Mock API: Create a draft on "backend"
 * @param {Object} draftData - Draft data to create
 * @returns {Promise<Object>} Created draft with server ID
 */
export const mockApiCreateDraft = async (draftData) => {
  await simulateNetworkDelay();
  
  // Simulate random server error (10% chance)
  if (Math.random() < 0.1) {
    throw new Error('Server error: Failed to create draft');
  }

  return {
    ...draftData,
    serverId: `srv_${Date.now()}`,
    syncedAt: new Date().toISOString(),
  };
};

/**
 * Mock API: Fetch all drafts from "backend"
 * @returns {Promise<Array>} Array of drafts
 */
export const mockApiFetchDrafts = async () => {
  await simulateNetworkDelay();
  
  // Simulate random server error (5% chance)
  if (Math.random() < 0.05) {
    throw new Error('Server error: Failed to fetch drafts');
  }

  return [];
};

/**
 * Mock API: Update a draft on "backend"
 * @param {number|string} id - Draft ID
 * @param {Object} updates - Updates to apply
 * @returns {Promise<Object>} Updated draft
 */
export const mockApiUpdateDraft = async (id, updates) => {
  await simulateNetworkDelay();
  
  // Simulate random server error (10% chance)
  if (Math.random() < 0.1) {
    throw new Error('Server error: Failed to update draft');
  }

  return {
    id,
    ...updates,
    syncedAt: new Date().toISOString(),
  };
};

/**
 * Mock API: Delete a draft from "backend"
 * @param {number|string} id - Draft ID
 * @returns {Promise<Object>} Success response
 */
export const mockApiDeleteDraft = async (id) => {
  await simulateNetworkDelay();
  
  // Simulate random server error (10% chance)
  if (Math.random() < 0.1) {
    throw new Error('Server error: Failed to delete draft');
  }

  return {
    success: true,
    id,
    message: 'Draft deleted successfully',
  };
};

/**
 * Mock API: Publish a draft (move to published posts)
 * @param {number|string} id - Draft ID
 * @returns {Promise<Object>} Published post data
 */
export const mockApiPublishDraft = async (id) => {
  await simulateNetworkDelay(800);
  
  // Simulate random server error (5% chance)
  if (Math.random() < 0.05) {
    throw new Error('Server error: Failed to publish draft');
  }

  return {
    postId: `post_${Date.now()}`,
    draftId: id,
    publishedAt: new Date().toISOString(),
    status: 'published',
  };
};
