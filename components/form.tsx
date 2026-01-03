'use client';

import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useFormContext } from '@/context/form-context';
import { FormData, TypeMap } from '@/lib/constants';

export const Form = () => {
  const { dataForm, error, displayData, updateField, isSubmit, isReset } = useFormContext();

  // Check if all form fields are valid
  const formValid = () => {
    return Object.values(dataForm).every((val) => val.trim() !== "") && Object.values(error).every((val) => val === "");
  }

  return (
    <div className="flex flex-row space-x-4">
      <div className="grid gap-3 border p-5">
        {Object.entries(dataForm).map(([key, value]) => {
          const field = key as keyof FormData
          return (
            <div key={field} className="grid gap-2">
              <Label htmlFor={field}>
                {field.substring(0, 1).toUpperCase() + field.substring(1)}
              </Label>
              <Input
                id={field}
                type={TypeMap[field]}
                placeholder={field}
                value={value}
                onChange={(e) => {
                  updateField(field, e.target.value);
                }}
              />
              {error[field] && (
                <p className="text-red-600 text-sm">{error[field]}</p>
              )}
            </div>
          );
        })}
        <div className="flex flex-row space-x-2">
          <Button
            onClick={() => isSubmit()}
            disabled={!formValid()}
            className="p-2"
          >
            Submit
          </Button>
          <Button onClick={() => isReset()} className="p-2">
            Reset
          </Button>
        </div>
      </div>
      <div>
        {displayData && (
          <>
            {
              Object.entries(displayData).map(([field, value]) => {
                return (
                  <div key={field} className="flex flex-row space-x-1">
                    <Label>{field.substring(0,1).toUpperCase() + field.substring(1,)}: </Label>
                    <p>{value}</p>
                  </div>
                );
              })
            }
          </>
        )}
      </div>
    </div>
  );
};
