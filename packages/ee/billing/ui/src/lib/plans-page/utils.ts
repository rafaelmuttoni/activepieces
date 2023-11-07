import {
  FlowPricingPlan,
  MeteredSubPlan,
  ProjectPlan,
  ProjectUsage,
} from '@activepieces/ee-shared';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

export function formatPrice(price: number): string {
  if (price === 0) {
    return 'Free';
  }
  if (price === -1) {
    return 'Custom';
  }
  return '$' + price + '/month';
}

export function openPortal(portalUrl: string) {
  window.open(portalUrl, '_blank', 'noopener noreferer');
}

export function formatNumberWithCommas(number: number): string {
  // Convert the number to a string
  const numStr = number.toString();

  // Split the string into integer and decimal parts (if any)
  const parts = numStr.split('.');

  // Format the integer part with commas
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Join the integer and decimal parts (if any)
  return parts.join('.');
}

export type Plan = {
  formControl: FormControl<MeteredSubPlan>;
  selectedPrice$: Observable<string> | undefined;
  selectedTasks$: Observable<string> | undefined;
  loading: boolean;
} & FlowPricingPlan;

export type loadPlansObs = Observable<{
  plans: Plan[];
  defaultPlan: { nickname: string };
  currentPlan: ProjectPlan;
  currentUsage: ProjectUsage & {
    daysLeftBeforeReset: number;
    hoursLeftBeforeReset: number;
  };
  customerPortalUrl: string;
}>;
