import { CreateDestinationForm } from "./_components/create-destination-form";


export const metadata = {
    title: "Create Destination | Wanderly",
};

export default function DashboardCreatePage() {
    return (
        <div className="mx-auto max-w-6xl">
            <CreateDestinationForm />
        </div>
    );
}