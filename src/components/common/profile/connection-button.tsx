"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface ConnectionButtonProps {
    label: string;
    onClick: () => Promise<void>;
    variant?: 'default' | 'reconnect';
}

export function ConnectionButton({ label, onClick, variant = 'default' }: ConnectionButtonProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        setIsLoading(true);
        try {
            await onClick();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            variant={variant === 'reconnect' ? 'destructive' : 'outline'}
            size="sm"
            className="whitespace-nowrap"
            onClick={handleClick}
            disabled={isLoading}
        >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {label}
        </Button>
    );
}