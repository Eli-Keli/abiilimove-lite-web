import { SidebarTrigger } from "@/components/ui/sidebar";

type HeaderProps = {
    title: string;
    description?: string;
    children?: React.ReactNode;
};

export function Header({ title, description, children }: HeaderProps) {
    return (
        <header className="flex items-center justify-between p-4 bg-card rounded-lg shadow-sm mb-6">
            <div className="flex items-center gap-4">
                <SidebarTrigger className="md:hidden" />
                <div>
                    <h1 className="text-2xl font-bold font-headline">{title}</h1>
                    {description && <p className="text-muted-foreground">{description}</p>}
                </div>
            </div>
            {children && <div className="flex items-center gap-2">{children}</div>}
        </header>
    );
}
