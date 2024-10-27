import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Pencil, Trash2, Plus, Dog, Cat, Heart } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Badge } from './ui/badge';
import { petService } from '../services/petService';
import PetProfile from './PetProfile';

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [petToDelete, setPetToDelete] = useState(null);

  useEffect(() => {
    loadPets();
  }, []);

  const loadPets = async () => {
    try {
      setLoading(true);
      const data = await petService.getAllPets();
      setPets(data);
      setError(null);
    } catch (err) {
      setError('Failed to load pets');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setSelectedPetId(null);
  };

  const handleEdit = (petId) => {
    setSelectedPetId(petId);
  };

  const handleDelete = async () => {
    if (!petToDelete) return;
    
    try {
      await petService.deletePet(petToDelete._id);
      setPets(pets.filter(pet => pet._id !== petToDelete._id));
      setShowDeleteDialog(false);
      setPetToDelete(null);
      if (selectedPetId === petToDelete._id) {
        setSelectedPetId(null);
      }
    } catch (err) {
      setError('Failed to delete pet');
      console.error(err);
    }
  };

  const confirmDelete = (pet) => {
    setPetToDelete(pet);
    setShowDeleteDialog(true);
  };

  const getPetIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'dog':
        return <Dog className="h-6 w-6" />;
      case 'cat':
        return <Cat className="h-6 w-6" />;
      default:
        return <Heart className="h-6 w-6" />;
    }
  };

  if (selectedPetId || selectedPetId === null) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={() => setSelectedPetId(undefined)}
            className="mb-4"
          >
            ← Back to Pet List
          </Button>
        </div>
        <PetProfile
          petId={selectedPetId}
          onSaved={() => {
            loadPets();
            setSelectedPetId(undefined);
          }}
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-gray-500">Loading pets...</p>
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

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Pets</h2>
        <Button onClick={handleAddNew} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Pet
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {pets.map((pet) => (
          <Card key={pet._id} className="relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getPetIcon(pet.type)}
                  <CardTitle className="text-lg">{pet.name}</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(pet._id)}
                  >
                    <Pencil className="h-4 w-4 text-gray-500 hover:text-blue-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => confirmDelete(pet)}
                  >
                    <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Badge variant="secondary">{pet.type}</Badge>
                  {pet.breed && <Badge variant="outline">{pet.breed}</Badge>}
                </div>
                <div className="text-sm text-gray-500">
                  <p>Age: {pet.age} years</p>
                  <p>Weight: {pet.weight}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Pet Profile</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {petToDelete?.name}'s profile? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PetList;