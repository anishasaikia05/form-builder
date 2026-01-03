export type FormData = {
    name: string;
    email: string;
    age: string,
    phone: string,
}

export type FieldValidation = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
  type?: 'string' | 'number' | 'email'
}

export const FieldValidator : Record<string, FieldValidation> = {
  name: { required: true, minLength: 3, maxLength: 50, type: 'string'},
  age: { required: true, minValue: 1, maxValue: 100, type: 'number'},
  email: { required: true, type: 'email'},
  phone: { required: true, minLength: 10, maxLength: 10, type: 'number'},
}

export const DefaultFormData = {
    name: '',
    email: '',
    age: '',
    phone: '',
}

export const TypeMap: Record<keyof FormData, string> = {
  name: "text",
  email: "email",
  age: "number",
  phone: "tel"
}