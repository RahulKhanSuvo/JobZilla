import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface AppTooltipProps {
    children: React.ReactNode;
    content: React.ReactNode;
}

export default function AppTooltip({ children, content }: AppTooltipProps) {
    return (
        <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
            <TooltipContent>{content}</TooltipContent>
        </Tooltip>
    );
}