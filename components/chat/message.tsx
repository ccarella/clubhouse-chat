import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface MessageProps {
  role: "user" | "assistant" | "system";
  content: string;
  isStreaming?: boolean;
}

export function Message({ role, content, isStreaming }: MessageProps) {
  return (
    <div
      className={cn(
        "flex gap-3 p-4 rounded-lg",
        role === "user" ? "bg-muted/50" : "bg-background"
      )}
    >
      <Avatar className="size-8 shrink-0">
        <div
          className={cn(
            "size-full rounded-full flex items-center justify-center text-xs font-semibold",
            role === "user"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          )}
        >
          {role === "user" ? "U" : role === "assistant" ? "AI" : "S"}
        </div>
      </Avatar>
      <div className="flex-1 space-y-2">
        <p className="text-sm font-medium">
          {role === "user" ? "You" : role === "assistant" ? "Assistant" : "System"}
        </p>
        <div className="text-sm text-muted-foreground whitespace-pre-wrap">
          {content}
          {isStreaming && (
            <span className="inline-block w-1 h-4 ml-1 bg-current animate-pulse" />
          )}
        </div>
      </div>
    </div>
  );
}