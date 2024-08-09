export interface InputProps {
  placeholder?: string;
  label?: string;
  type?: string;
  name: string;
  error?: string;
  id?: string;
  value?: string;
}

export interface FormData {
  username: string;
  email: string;
  password: string;
}
