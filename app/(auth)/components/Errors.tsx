import { FieldError } from "@/components/ui/field";

type ErrorsProps = {
  children?: string[]
};

export default function Errors({ children }: ErrorsProps) {
  return children ? children.map((msg, i) => (
    <FieldError key={i}>{msg}</FieldError>
  )) : null
}
