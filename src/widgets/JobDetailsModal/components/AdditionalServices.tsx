import React from 'react';
import { CheckCircle, Package, Weight, Box, Building } from 'lucide-react';

interface AdditionalServicesProps {
    packingBoxes: boolean;
    bulkyItems: boolean;
    inventoryList: boolean;
    hoisting: boolean;
    additionalServicesDescription: string;
}

export const AdditionalServices = ({
    packingBoxes,
    bulkyItems,
    inventoryList,
    hoisting,
    additionalServicesDescription
}: AdditionalServicesProps) => {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <CheckCircle size={20} className="text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Additional Services</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
                {packingBoxes && (
                    <div className="flex items-center gap-3 bg-[#60A5FA]/10 p-3 rounded-xl border border-[#60A5FA]/30">
                        <Package size={16} className="text-[#60A5FA]" />
                        <span className="text-sm font-medium text-[#1E40AF]">Packing Boxes</span>
                    </div>
                )}
                {bulkyItems && (
                    <div className="flex items-center gap-3 bg-orange-50 p-3 rounded-xl border border-orange-200">
                        <Weight size={16} className="text-orange-600" />
                        <span className="text-sm font-medium text-orange-800">Bulky Items</span>
                    </div>
                )}
                {inventoryList && (
                    <div className="flex items-center gap-3 bg-purple-50 p-3 rounded-xl border border-purple-200">
                        <Box size={16} className="text-purple-600" />
                        <span className="text-sm font-medium text-purple-800">Inventory List</span>
                    </div>
                )}
                {hoisting && (
                    <div className="flex items-center gap-3 bg-red-50 p-3 rounded-xl border border-red-200">
                        <Building size={16} className="text-red-600" />
                        <span className="text-sm font-medium text-red-800">Hoisting</span>
                    </div>
                )}
            </div>
            
            {additionalServicesDescription && (
                <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-xs font-medium text-gray-500 mb-2">Description</p>
                    <p className="text-sm text-gray-700">{additionalServicesDescription}</p>
                </div>
            )}
        </div>
    );
};