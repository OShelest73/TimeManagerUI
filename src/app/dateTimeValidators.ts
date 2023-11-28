import { AbstractControl, ValidatorFn } from '@angular/forms';

export function dateRangeValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const startDate = control.get('startDate')?.value;
    const endDate = control.get('finishDate')?.value;

    if (startDate && endDate && startDate > endDate) {
      return { dateRange: true };
    }

    return null;
  };
}

export function currentDateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const currentDate = new Date();
    const selectedDate = control.value;

    if (selectedDate && selectedDate < currentDate) {
      return { currentDate: true };
    }

    return null;
  };
}