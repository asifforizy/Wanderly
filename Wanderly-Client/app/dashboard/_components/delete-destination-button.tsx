"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { deleteDestination } from "../_action/delete-destination";




export function DeleteDestinationButton({ id, name }: { id: string; name: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;

        setLoading(true);
        const result = await deleteDestination(id);
        setLoading(false);

        if (!result.success) {
            toast.error(result.message);
            return;
        }

        toast.success("Destination deleted");
        router.refresh();
    };

    return (
        <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleDelete}
            disabled={loading}
            className="text-red-600 hover:text-red-600"
        >
            {loading ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
            Delete
        </Button>
    );
}