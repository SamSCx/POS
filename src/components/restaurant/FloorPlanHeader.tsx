import { Save, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import ModeToggle from "./ModeToggle";

interface FloorPlanHeaderProps {
  mode?: "edit" | "order";
  onModeChange?: (mode: "edit" | "order") => void;
  onSave?: () => void;
  onSettings?: () => void;
}

const FloorPlanHeader = ({
  mode = "order",
  onModeChange = () => {},
  onSave = () => {},
  onSettings = () => {},
}: FloorPlanHeaderProps) => {
  return (
    <header className="w-full h-16 px-4 border-b bg-background flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold">Floor Plan</h1>
        <ModeToggle mode={mode} onModeChange={onModeChange} />
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onSave}
          className="flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          <span>Save Layout</span>
        </Button>
        <Button variant="ghost" size="icon" onClick={onSettings}>
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default FloorPlanHeader;
