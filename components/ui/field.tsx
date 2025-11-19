import * as React from "react";
import {Slot} from "@radix-ui/react-slot";

import {cn} from "@/lib/utils";

const Field = React.forwardRef<
    React.ElementRef<"div">,
    React.ComponentPropsWithoutRef<"div">
>(({className, ...props}, ref) => (
    <div ref={ref} className={cn("grid gap-2", className)} {...props} />
));
Field.displayName = "Field";

const FieldGroup = React.forwardRef<
    React.ElementRef<"div">,
    React.ComponentPropsWithoutRef<"div">
>(({className, ...props}, ref) => (
    <div
        ref={ref}
        className={cn("grid gap-6 md:grid-cols-2", className)}
        {...props}
    />
));
FieldGroup.displayName = "FieldGroup";

const FieldLabel = React.forwardRef<
    React.ElementRef<"label">,
    React.ComponentPropsWithoutRef<"label">
>(({className, ...props}, ref) => (
    <label
        ref={ref}
        className={cn("text-sm font-semibold leading-none tracking-wide", className)}
        {...props}
    />
));
FieldLabel.displayName = "FieldLabel";

const FieldControl = React.forwardRef<
    React.ElementRef<typeof Slot>,
    React.ComponentPropsWithoutRef<typeof Slot>
>(({className, ...props}, ref) => (
    <Slot ref={ref} className={cn("grid gap-2", className)} {...props} />
));
FieldControl.displayName = "FieldControl";

const FieldDescription = React.forwardRef<
    React.ElementRef<"p">,
    React.ComponentPropsWithoutRef<"p">
>(({className, ...props}, ref) => (
    <p
        ref={ref}
        className={cn("text-xs text-muted-foreground", className)}
        {...props}
    />
));
FieldDescription.displayName = "FieldDescription";

const FieldMessage = React.forwardRef<
    React.ElementRef<"p">,
    React.ComponentPropsWithoutRef<"p">
>(({className, ...props}, ref) => (
    <p
        ref={ref}
        className={cn("text-sm font-medium text-destructive", className)}
        {...props}
    />
));
FieldMessage.displayName = "FieldMessage";

export {Field, FieldGroup, FieldLabel, FieldControl, FieldDescription, FieldMessage};
