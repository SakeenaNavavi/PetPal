// src/services/petService.js
const API_URL = 'http://localhost:5000/api';

export const petService = {
  async getAllPets() {
    const response = await fetch(`${API_URL}/pets`);
    if (!response.ok) {
      throw new Error('Failed to fetch pets');
    }
    return response.json();
  },

  async getPetById(id) {
    const response = await fetch(`${API_URL}/pets/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch pet');
    }
    return response.json();
  },

  async createPet(petData) {
    const response = await fetch(`${API_URL}/pets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(petData),
    });
    if (!response.ok) {
      throw new Error('Failed to create pet');
    }
    return response.json();
  },

  async updatePet(id, petData) {
    const response = await fetch(`${API_URL}/pets/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(petData),
    });
    if (!response.ok) {
      throw new Error('Failed to update pet');
    }
    return response.json();
  },

  async deletePet(id) {
    const response = await fetch(`${API_URL}/pets/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete pet');
    }
    return response.json();
  },
};