import { FieldError } from "@/components/ui/field"

type FormErrorProps = {
  children?: string | null;
};

export default function Error({ children }: FormErrorProps) {
  return children ? <FieldError>{children}</FieldError> : null;
}

