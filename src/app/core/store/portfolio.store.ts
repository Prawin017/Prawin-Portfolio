import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed } from '@angular/core';

export interface PortfolioState {
  selectedCategory: string;
  contactSubmitState: 'idle' | 'submitting' | 'success' | 'error';
  contactErrorMessage: string | null;
}

const initialState: PortfolioState = {
  selectedCategory: 'All',
  contactSubmitState: 'idle',
  contactErrorMessage: null
};

export const PortfolioStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((state) => ({
    isSubmitting: computed(() => state.contactSubmitState() === 'submitting'),
    isSubmitSuccess: computed(() => state.contactSubmitState() === 'success'),
    isSubmitError: computed(() => state.contactSubmitState() === 'error')
  })),
  withMethods((store) => ({
    setSelectedCategory(category: string) {
      patchState(store, { selectedCategory: category });
    },
    setContactSubmitting() {
      patchState(store, { contactSubmitState: 'submitting', contactErrorMessage: null });
    },
    setContactSuccess() {
      patchState(store, { contactSubmitState: 'success', contactErrorMessage: null });
    },
    setContactError(error: string) {
      patchState(store, { contactSubmitState: 'error', contactErrorMessage: error });
    },
    resetContactState() {
      patchState(store, { contactSubmitState: 'idle', contactErrorMessage: null });
    }
  }))
);
export type PortfolioStore = InstanceType<typeof PortfolioStore>;
