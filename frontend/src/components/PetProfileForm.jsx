import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, X } from 'lucide-react';

const PetProfileForm = ({ existingPet, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(existingPet || {
    name: '',
    type: '',
    breed: '',
    age: '',
    weight: '',
    medicalInfo: {
      allergies: [],
      conditions: [],
      lastCheckup: ''
    }
  });

  const [newAllergy, setNewAllergy] = useState('');
  const [newCondition, setNewCondition] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAddAllergy = () => {
    if (newAllergy.trim()) {
      setFormData(prev => ({
        ...prev,
        medicalInfo: {
          ...prev.medicalInfo,
          allergies: [...prev.medicalInfo.allergies, newAllergy.trim()]
        }
      }));
      setNewAllergy('');
    }
  };

  const handleRemoveAllergy = (index) => {
    setFormData(prev => ({
      ...prev,
      medicalInfo: {
        ...prev.medicalInfo,
        allergies: prev.medicalInfo.allergies.filter((_, i) => i !== index)
      }
    }));
  };

  const handleAddCondition = () => {
    if (newCondition.trim()) {
      setFormData(prev => ({
        ...prev,
        medicalInfo: {
          ...prev.medicalInfo,
          conditions: [...prev.medicalInfo.conditions, newCondition.trim()]
        }
      }));
      setNewCondition('');
    }
  };

  const handleRemoveCondition = (index) => {
    setFormData(prev => ({
      ...prev,
      medicalInfo: {
        ...prev.medicalInfo,
        conditions: prev.medicalInfo.conditions.filter((_, i) => i !== index)
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{existingPet ? 'Edit Pet Profile' : 'Create New Pet Profile'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Pet Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Pet Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">Select type</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Breed</label>
              <input
                type="text"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Age (years)</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                min="0"
                step="0.1"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Weight (kg)</label>
              <input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Last Checkup</label>
              <input
                type="date"
                name="medicalInfo.lastCheckup"
                value={formData.medicalInfo.lastCheckup}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Allergies</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newAllergy}
                  onChange={(e) => setNewAllergy(e.target.value)}
                  className="flex-1 p-2 border rounded-md"
                  placeholder="Add allergy"
                />
                <button
                  type="button"
                  onClick={handleAddAllergy}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.medicalInfo.allergies.map((allergy, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full"
                  >
                    {allergy}
                    <X
                      className="h-4 w-4 cursor-pointer hover:text-red-500"
                      onClick={() => handleRemoveAllergy(index)}
                    />
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Medical Conditions</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCondition}
                  onChange={(e) => setNewCondition(e.target.value)}
                  className="flex-1 p-2 border rounded-md"
                  placeholder="Add condition"
                />
                <button
                  type="button"
                  onClick={handleAddCondition}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.medicalInfo.conditions.map((condition, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full"
                  >
                    {condition}
                    <X
                      className="h-4 w-4 cursor-pointer hover:text-red-500"
                      onClick={() => handleRemoveCondition(index)}
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {existingPet ? 'Update Pet' : 'Create Pet'}
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PetProfileForm;