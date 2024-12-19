import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Receipt, Wallet, ArrowLeft } from "lucide-react";
import BillingSplitView from "./BillingSplitView";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface BillingDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  items?: OrderItem[];
  onPaymentComplete?: () => void;
}

const BillingDialog = ({
  open = true,
  onOpenChange = () => {},
  items = [],
  onPaymentComplete = () => {},
}: BillingDialogProps) => {
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [isSplitting, setIsSplitting] = useState(false);
  const [splitItems, setSplitItems] = useState<OrderItem[]>([]);
  const [showSplitPayment, setShowSplitPayment] = useState(false);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const splitTotal = splitItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleSplitConfirm = (selectedItems: OrderItem[]) => {
    setSplitItems(selectedItems);
    setIsSplitting(false);
    setShowSplitPayment(true);
  };

  const handleSplitPayment = () => {
    // Here you would integrate with iZettle SDK for card payments
    if (paymentMethod === "card") {
      console.log("Processing card payment with iZettle...");
    }

    // Update the main order by removing the split items
    const remainingItems = items
      .map((item) => {
        const splitItem = splitItems.find((split) => split.id === item.id);
        if (splitItem) {
          const newQuantity = item.quantity - splitItem.quantity;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      })
      .filter(Boolean) as OrderItem[];

    if (remainingItems.length === 0) {
      onPaymentComplete();
    } else {
      // Reset split state and update items
      setShowSplitPayment(false);
      setSplitItems([]);
      // Here you would update the parent with remaining items
    }
  };

  const handleFullPayment = () => {
    // Here you would integrate with iZettle SDK for card payments
    if (paymentMethod === "card") {
      console.log("Processing card payment with iZettle...");
    }
    onPaymentComplete();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[600px] bg-background">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {showSplitPayment && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSplitPayment(false)}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            {showSplitPayment ? "Split Payment" : "Payment"}
          </DialogTitle>
        </DialogHeader>

        {isSplitting ? (
          <BillingSplitView items={items} onSplitConfirm={handleSplitConfirm} />
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <span className="text-lg font-semibold">Total Amount</span>
              <span className="text-2xl font-bold">
                ${(showSplitPayment ? splitTotal : total).toFixed(2)}
              </span>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Payment Method</h3>
              <Tabs
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 h-[60px]">
                  <TabsTrigger value="card" className="flex flex-col gap-1">
                    <CreditCard className="h-4 w-4" />
                    <span>Card</span>
                  </TabsTrigger>
                  <TabsTrigger value="cash" className="flex flex-col gap-1">
                    <Wallet className="h-4 w-4" />
                    <span>Cash</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              {!showSplitPayment && (
                <Button
                  variant="outline"
                  className="flex-1 gap-2"
                  onClick={() => setIsSplitting(true)}
                >
                  <Receipt className="h-4 w-4" />
                  Split Bill
                </Button>
              )}
              <Button
                className="flex-1"
                onClick={
                  showSplitPayment ? handleSplitPayment : handleFullPayment
                }
              >
                Pay ${(showSplitPayment ? splitTotal : total).toFixed(2)}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BillingDialog;
