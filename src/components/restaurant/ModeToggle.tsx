import { Edit, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ModeToggleProps {
  mode?: "edit" | "order";
  onModeChange?: (mode: "edit" | "order") => void;
}

const ModeToggle = ({
  mode = "order",
  onModeChange = () => {},
}: ModeToggleProps) => {
  return (
    <div className="flex items-center justify-center h-10 bg-background rounded-lg border">
      <Button
        variant="ghost"
        size="sm"
        className={cn("flex-1 gap-2", mode === "edit" && "bg-accent")}
        onClick={() => onModeChange("edit")}
      >
        <Edit className="h-4 w-4" />
        <span>Edit</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={cn("flex-1 gap-2", mode === "order" && "bg-accent")}
        onClick={() => onModeChange("order")}
      >
        <ShoppingCart className="h-4 w-4" />
        <span>Order</span>
      </Button>
    </div>
  );
};

export default ModeToggle;
