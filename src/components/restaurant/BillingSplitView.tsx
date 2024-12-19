import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign } from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface BillingSplitViewProps {
  items?: OrderItem[];
  onSplitConfirm?: (selectedItems: OrderItem[]) => void;
}

const BillingSplitView = ({
  items = [],
  onSplitConfirm = () => {},
}: BillingSplitViewProps) => {
  const [splitQuantities, setSplitQuantities] = useState<
    Record<string, number>
  >({});

  const handleQuantityChange = (itemId: string, value: string) => {
    const item = items.find((i) => i.id === itemId);
    if (!item) return;

    const quantity = parseInt(value) || 0;
    if (quantity >= 0 && quantity <= item.quantity) {
      setSplitQuantities({
        ...splitQuantities,
        [itemId]: quantity,
      });
    }
  };

  const selectedItems = items
    .map((item) => {
      const splitQuantity = splitQuantities[item.id] || 0;
      return splitQuantity > 0 ? { ...item, quantity: splitQuantity } : null;
    })
    .filter(Boolean) as OrderItem[];

  const total = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <Card className="w-full flex flex-col bg-background">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Split Bill</h2>
        <p className="text-sm text-muted-foreground">
          Enter quantities to split for each item
        </p>
      </div>

      <ScrollArea className="flex-1 p-4 max-h-[400px]">
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-4 p-3 rounded-lg border"
            >
              <div className="flex-1">
                <Label className="text-sm font-medium">{item.name}</Label>
                <p className="text-sm text-muted-foreground">
                  ${item.price.toFixed(2)} × {item.quantity} available
                </p>
              </div>
              <div className="w-24">
                <Input
                  type="number"
                  min="0"
                  max={item.quantity}
                  value={splitQuantities[item.id] || ""}
                  onChange={(e) =>
                    handleQuantityChange(item.id, e.target.value)
                  }
                  className="text-right"
                />
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {selectedItems.length} items selected
          </span>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            <span className="text-lg font-bold">${total.toFixed(2)}</span>
          </div>
        </div>

        <Button
          className="w-full"
          disabled={selectedItems.length === 0}
          onClick={() => onSplitConfirm(selectedItems)}
        >
          Confirm Split
        </Button>
      </div>
    </Card>
  );
};

export default BillingSplitView;
