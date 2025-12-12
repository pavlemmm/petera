import React, {ReactNode} from 'react';
import {cn} from "@/lib/utils";

export default function Section({children, className}: {children: ReactNode, className?: string}) {
    return (
        <div className={cn("rounded-4xl py-10 px-5 shadow-2xl", className)}>
            {children}
        </div>
    );
}