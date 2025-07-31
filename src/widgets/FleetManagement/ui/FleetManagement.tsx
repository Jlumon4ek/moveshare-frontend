import { useState, useEffect } from 'react';
import { Truck } from 'lucide-react';
import { TruckCard } from '../../../entities/Truck/ui/TruckCard';
import { Button } from '../../../shared/ui/Button/Button';
import { AddTruckModal } from '../../AddTruckModal/ui/AddTruckModal';
import { trucksApi, type Truck as TruckData } from '../../../shared/api/trucks';
import { ConfirmationModal } from '../../../shared/ui/ConfirmationModal/ConfirmationModal';
import { toastStore } from '../../../shared/lib/toast/toastStore';

export const FleetManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trucks, setTrucks] = useState<TruckData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [truckToDelete, setTruckToDelete] = useState<number | null>(null);
  const fetchTrucks = async () => {
    try {
      setIsLoading(true);
      const response = await trucksApi.getTrucks();
      setTrucks(response.trucks || []); 
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch trucks');
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchTrucks();
  }, []);

  const openDeleteModal = (id: number) => {
    setTruckToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setTruckToDelete(null);
    setIsDeleteModalOpen(false);
  };
  

  const handleConfirmDelete = async () => {
    if (!truckToDelete) return;
    try {
      await trucksApi.deleteTruck(truckToDelete);
      setTrucks(prevTrucks => prevTrucks.filter(t => t.id !== truckToDelete));
      toastStore.show('Truck deleted successfully!', 'success');
    } catch (err) {
      toastStore.show('Failed to delete truck.', 'error');
    } finally {
      closeDeleteModal();
    }
  };
  const renderContent = () => {
    if (isLoading) {
      return <p className="text-center text-gray-500 col-span-2">Loading trucks...</p>;
    }
    if (error) {
      return <p className="text-center text-red-500 col-span-2">{error}</p>;
    }
    if (trucks.length === 0) {
        return (
          <div className="col-span-2 flex flex-col items-center justify-center py-10">
            <Truck className="text-gray-400" size={48} />
            <p className="mt-4 text-center text-gray-500">No trucks found. Click '+ Add Truck' to add your first one!</p>
          </div>
        );
    }
    return trucks.map((truck) => <TruckCard key={truck.id} truck={truck} onDelete={openDeleteModal} />);
  };

  return (
    <>
      <div className="bg-white px-8 pt-6 pb-8 rounded-2xl shadow-sm h-full flex flex-col">
        <div className="flex justify-between items-center flex-shrink-0">
          <h2 className="text-2xl font-bold text-gray-800">Fleet Management</h2>
          <Button onClick={() => setIsModalOpen(true)} size="sm">
            + Add Truck
          </Button>
        </div>

        <hr className="mt-6 mb-6 border-gray-200 flex-shrink-0" />
        
        <div className="flex-1 overflow-y-auto pb-6 hide-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderContent()}
          </div>
        </div>
      </div>
      
      {isModalOpen && <AddTruckModal onClose={() => setIsModalOpen(false)} onSuccess={fetchTrucks} />}


      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Delete Truck"
        confirmText="Delete"
      >
        <p>Are you sure you want to delete this truck? This action cannot be undone.</p>
      </ConfirmationModal>
    </>
  );
};