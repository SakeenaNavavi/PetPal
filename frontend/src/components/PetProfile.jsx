import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, Pencil, Heart } from 'lucide-react';
import PetProfileForm from './PetProfileForm';

const PetProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [pet, setPet] = useState({
    name: 'Max',
    type: 'Dog',
    breed: 'Golden Retriever',
    age: 3,
    weight: '30kg',
    nextFeeding: '18:00',
    nextGrooming: '2024-11-01',
    medicalInfo: {
      allergies: ['Chicken'],
      conditions: ['None'],
      lastCheckup: '2024-09-15'
    }
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = (updatedPet) => {
    setPet(updatedPet);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (isEditing) {
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
                <p>Last Checkup: {pet.medicalInfo.lastCheckup}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PetProfile;