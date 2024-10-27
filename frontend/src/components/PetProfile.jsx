import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Bell, Pencil, Heart } from 'lucide-react';
import PetProfileForm from './PetProfileForm';
import { petService } from '../services/petService';

const PetProfile = ({ petId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (petId) {
      loadPet();
    } else {
      setLoading(false);
    }
  }, [petId]);

  const loadPet = async () => {
    try {
      const data = await petService.getPetById(petId);
      setPet(data);
      setError(null);
    } catch (err) {
      setError('Failed to load pet data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = async (updatedPetData) => {
    try {
      setLoading(true);
      if (pet?._id) {
        const updatedPet = await petService.updatePet(pet._id, updatedPetData);
        setPet(updatedPet);
      } else {
        const newPet = await petService.createPet(updatedPetData);
        setPet(newPet);
      }
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError('Failed to save pet data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (isEditing || !pet) {
    return (
      <PetProfileForm
        existingPet={pet}
        onSubmit={handleUpdate}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-blue-500" />
            <CardTitle>{pet.name}</CardTitle>
          </div>
          <Pencil 
            className="h-5 w-5 text-gray-400 cursor-pointer hover:text-blue-500"
            onClick={handleEdit}
          />
        </div>
        <div className="flex gap-2 mt-2">
          <Badge variant="secondary">{pet.type}</Badge>
          <Badge variant="outline">{pet.breed}</Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-sm">
              <p className="text-gray-500">Age</p>
              <p className="font-medium">{pet.age} years</p>
            </div>
            <div className="text-sm">
              <p className="text-gray-500">Weight</p>
              <p className="font-medium">{pet.weight}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-medium">Next Feeding</span>
              </div>
              <span className="text-sm text-blue-600">{pet.nextFeeding}</span>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Medical Information</p>
              <div className="text-sm space-y-1">
                <p>Allergies: {pet.medicalInfo.allergies.join(', ') || 'None'}</p>
                <p>Conditions: {pet.medicalInfo.conditions.join(', ')}</p>
                <p>Last Checkup: {new Date(pet.medicalInfo.lastCheckup).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PetProfile;