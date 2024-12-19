import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface OrderItemProps {
  id?: string;
  name?: string;
  price?: number;
  quantity?: number;
  onQuantityChange?: (quantity: number) => void;
  onRemove?: () => void;
}

const OrderItem = ({
  id = "1",
  name = "Sample Item",
  price = 0.0,
  quantity = 1,
  onQuantityChange = () => {},
  onRemove = () => {},
}: OrderItemProps) => {
  const handleIncrement = () => {
    onQuantityChange(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  return (
    <div className="w-full h-16 bg-background border rounded-lg p-2 flex items-center justify-between gap-2">
      <div className="flex-1 min-w-0">
        <h4 className="font-medium truncate">{name}</h4>
        <p className="text-sm text-muted-foreground">
          ${price.toFixed(2)} × {quantity}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center rounded-md border">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleDecrement}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleIncrement}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8 text-muted-foreground hover:text-destructive",
            "hover:bg-destructive/10",
          )}
          onClick={onRemove}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default OrderItem;
