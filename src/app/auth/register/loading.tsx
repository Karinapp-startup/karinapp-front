import { Spinner } from "@/components/common/spinner";

export default function RegisterLoading() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Spinner size="xl" />
        </div>
    );
} 