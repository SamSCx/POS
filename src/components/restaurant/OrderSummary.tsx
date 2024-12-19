import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Receipt, CreditCard } from "lucide-react";
import OrderItem from "./OrderItem";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderSummaryProps {
  items?: OrderItem[];
  onQuantityChange?: (itemId: string, quantity: number) => void;
  onRemoveItem?: (itemId: string) => void;
  onCheckout?: () => void;
  onSplitBill?: () => void;
}

const OrderSummary = ({
  items = [
    { id: "1", name: "Cola", price: 2.5, quantity: 2 },
    { id: "2", name: "Water", price: 1.5, quantity: 1 },
    { id: "3", name: "Coffee", price: 3.0, quantity: 1 },
  ],
  onQuantityChange = () => {},
  onRemoveItem = () => {},
  onCheckout = () => {},
  onSplitBill = () => {},
}: OrderSummaryProps) => {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <Card className="flex flex-col h-[370px] bg-background">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Order Summary</h2>
        <p className="text-sm text-muted-foreground">{items.length} items</p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          {items.map((item) => (
            <OrderItem
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              onQuantityChange={(quantity) =>
                onQuantityChange(item.id, quantity)
              }
              onRemove={() => onRemoveItem(item.id)}
            />
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-semibold">Total</span>
          <span className="text-lg font-bold">${total.toFixed(2)}</span>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1 gap-2"
            onClick={onSplitBill}
          >
            <Receipt className="h-4 w-4" />
            <span>Split Bill</span>
          </Button>
          <Button className="flex-1 gap-2" onClick={onCheckout}>
            <CreditCard className="h-4 w-4" />
            <span>Checkout</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default OrderSummary;
