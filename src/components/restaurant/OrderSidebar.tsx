import { useState, useEffect } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import CategoryTabs from "./CategoryTabs";
import ProductGrid from "./ProductGrid";
import OrderSummary from "./OrderSummary";

interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderSidebarProps {
  isOpen?: boolean;
  selectedTable?: string;
  onClose?: () => void;
  onFinishTable?: (tableId: string) => void;
  onUpdateOrder?: (items: OrderItem[]) => void;
  initialItems?: OrderItem[];
}

const OrderSidebar = ({
  isOpen = true,
  selectedTable = "1",
  onClose = () => {},
  onFinishTable = () => {},
  onUpdateOrder = () => {},
  initialItems = [],
}: OrderSidebarProps) => {
  const [selectedCategory, setSelectedCategory] = useState("drinks");
  const [orderItems, setOrderItems] = useState<OrderItem[]>(initialItems);

  useEffect(() => {
    setOrderItems(initialItems);
  }, [initialItems]);

  const handleProductSelect = (product: Product) => {
    const existingItem = orderItems.find((item) => item.id === product.id);
    let updatedItems: OrderItem[];

    if (existingItem) {
      updatedItems = orderItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    } else {
      updatedItems = [
        ...orderItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        },
      ];
    }

    setOrderItems(updatedItems);
    onUpdateOrder(updatedItems);
  };

  const handleQuantityChange = (itemId: string, quantity: number) => {
    const updatedItems = orderItems.map((item) =>
      item.id === itemId ? { ...item, quantity } : item,
    );
    setOrderItems(updatedItems);
    onUpdateOrder(updatedItems);
  };

  const handleRemoveItem = (itemId: string) => {
    const updatedItems = orderItems.filter((item) => item.id !== itemId);
    setOrderItems(updatedItems);
    onUpdateOrder(updatedItems);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-[400px] p-0 bg-background flex flex-col"
      >
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Table {selectedTable}</h2>
          </div>

          <CategoryTabs
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          <ProductGrid onProductSelect={handleProductSelect} />

          <OrderSummary
            items={orderItems}
            onQuantityChange={handleQuantityChange}
            onCheckout={() => onFinishTable(selectedTable)}
            onRemoveItem={handleRemoveItem}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default OrderSidebar;
