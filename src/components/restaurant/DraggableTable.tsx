import { useState } from "react";
import { Users, DollarSign, Receipt } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TableStatus {
  isOccupied?: boolean;
  guestCount?: number;
  totalAmount?: number;
  orderItems?: any[];
}

interface DraggableTableProps {
  id?: string;
  tableNumber?: number;
  status?: TableStatus;
  isSelected?: boolean;
  isEditMode?: boolean;
  onSelect?: () => void;
  onBilling?: () => void;
  style?: React.CSSProperties;
}

const DraggableTable = ({
  id = "1",
  tableNumber = 1,
  status = { isOccupied: false, guestCount: 0, totalAmount: 0, orderItems: [] },
  isSelected = false,
  isEditMode = false,
  onSelect = () => {},
  onBilling = () => {},
  style = {},
}: DraggableTableProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(style);

  const handleDragStart = (e: React.DragEvent) => {
    if (!isEditMode) return;
    setIsDragging(true);
    e.dataTransfer.setData("text/plain", id);

    // Store the mouse offset relative to the element
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    e.dataTransfer.setData(
      "offset",
      JSON.stringify({ x: offsetX, y: offsetY }),
    );
  };

  const handleDragEnd = (e: React.DragEvent) => {
    if (!isEditMode) return;
    setIsDragging(false);

    // Update position
    const offset = JSON.parse(e.dataTransfer.getData("offset"));
    const newX = e.clientX - offset.x;
    const newY = e.clientY - offset.y;

    setPosition({
      ...style,
      left: newX,
      top: newY,
    });
  };

  return (
    <Card
      draggable={isEditMode}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={!isEditMode ? onSelect : undefined}
      style={position}
      className={cn(
        "w-[120px] h-[140px] flex flex-col items-center justify-between p-3 cursor-pointer transition-all bg-background",
        isSelected && "ring-2 ring-primary",
        isDragging && "opacity-50",
        status.isOccupied && status.orderItems?.length
          ? "bg-accent"
          : "hover:bg-accent/50",
      )}
    >
      <div className="text-lg font-semibold">Table {tableNumber}</div>

      {status.isOccupied && status.orderItems?.length > 0 && (
        <div className="flex flex-col items-center gap-1">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{status.guestCount}</span>
          </Badge>

          <Badge variant="outline" className="flex items-center gap-1">
            <DollarSign className="h-3 w-3" />
            <span>{status.totalAmount.toFixed(2)}</span>
          </Badge>
        </div>
      )}

      {status.isOccupied && status.orderItems?.length > 0 && (
        <Button
          size="sm"
          variant="secondary"
          className="w-full mt-2 gap-1"
          onClick={(e) => {
            e.stopPropagation();
            onBilling();
          }}
        >
          <Receipt className="h-3 w-3" />
          Bill
        </Button>
      )}
    </Card>
  );
};

export default DraggableTable;
