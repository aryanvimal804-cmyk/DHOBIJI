import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Address {
  id: string;
  fullName: string;
  phoneNumber: string;
  houseNumber: string; // Flat / House / Building
  street: string; // Area / Street / Colony
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  tag: 'Home' | 'Work' | 'Other';
  isDefault?: boolean;
}

interface AddressState {
  addresses: Address[];
  selectedAddressId: string | null;
  addAddress: (address: Omit<Address, 'id'>) => Address;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  selectAddress: (id: string) => void;
  getSelectedAddress: () => Address | null;
  formatAddress: (address?: Address | null) => string;
}

const defaultAddresses: Address[] = [
  {
    id: 'addr-1',
    fullName: 'Rahul Sharma',
    phoneNumber: '+91 9876543210',
    houseNumber: 'Apt 4B, Sunflower Residency',
    street: 'Residency Road, Ashok Nagar',
    landmark: 'Near City Mall',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560025',
    tag: 'Home',
    isDefault: true,
  },
  {
    id: 'addr-2',
    fullName: 'Rahul Sharma',
    phoneNumber: '+91 9876543210',
    houseNumber: 'Tower B, 4th Floor',
    street: 'Prestige Tech Park, Marathahalli - Sarjapur Outer Ring Rd',
    landmark: 'Opposite Cisco Campus',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560103',
    tag: 'Work',
    isDefault: false,
  }
];

export const formatAddressToString = (addr?: Address | null): string => {
  if (!addr) return '';
  const parts = [
    addr.houseNumber,
    addr.street,
    addr.landmark ? `Near ${addr.landmark}` : null,
    `${addr.city}, ${addr.state} - ${addr.pincode}`,
  ].filter(Boolean);
  return parts.join(', ');
};

export const useAddressStore = create<AddressState>()(
  persist(
    (set, get) => ({
      addresses: defaultAddresses,
      selectedAddressId: 'addr-1',

      addAddress: (addressData) => {
        const newAddress: Address = {
          ...addressData,
          id: `addr-${Date.now()}`,
        };

        set((state) => {
          let updatedList = [...state.addresses];
          if (newAddress.isDefault) {
            updatedList = updatedList.map((a) => ({ ...a, isDefault: false }));
          }
          return {
            addresses: [newAddress, ...updatedList],
            selectedAddressId: newAddress.id,
          };
        });

        return newAddress;
      },

      updateAddress: (id, updatedFields) => {
        set((state) => {
          let updatedList = state.addresses.map((a) => {
            if (a.id === id) {
              return { ...a, ...updatedFields };
            }
            if (updatedFields.isDefault) {
              return { ...a, isDefault: false };
            }
            return a;
          });

          return { addresses: updatedList };
        });
      },

      deleteAddress: (id) => {
        set((state) => {
          const remaining = state.addresses.filter((a) => a.id !== id);
          const nextSelectedId =
            state.selectedAddressId === id
              ? remaining.length > 0
                ? remaining[0].id
                : null
              : state.selectedAddressId;

          return {
            addresses: remaining,
            selectedAddressId: nextSelectedId,
          };
        });
      },

      selectAddress: (id) => set({ selectedAddressId: id }),

      getSelectedAddress: () => {
        const { addresses, selectedAddressId } = get();
        if (!addresses.length) return null;
        const found = addresses.find((a) => a.id === selectedAddressId);
        return found || addresses[0];
      },

      formatAddress: (addr) => {
        const addressToFormat = addr || get().getSelectedAddress();
        return formatAddressToString(addressToFormat);
      },
    }),
    {
      name: 'dhobigo-address-storage',
    }
  )
);
