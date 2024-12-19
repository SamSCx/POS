import { useState } from "react";
import FloorPlanHeader from "./restaurant/FloorPlanHeader";
import DraggableTable from "./restaurant/DraggableTable";
import OrderSidebar from "./restaurant/OrderSidebar";
import BillingDialog from "./restaurant/BillingDialog";

interface TableData {
  id: string;
  tableNumber: number;
  position: { x: number; y: number };
  status: {
    isOccupied: boolean;
    guestCount: number;
    totalAmount: number;
    orderItems?: OrderItem[];
  };
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const Home = () => {
  const [mode, setMode] = useState<"edit" | "order">("order");
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [showOrderSidebar, setShowOrderSidebar] = useState(false);
  const [showBillingDialog, setShowBillingDialog] = useState(false);
  const [tables, setTables] = useState<TableData[]>([
    {
      id: "1",
      tableNumber: 1,
      position: { x: 100, y: 100 },
      status: {
        isOccupied: false,
        guestCount: 0,
        totalAmount: 0,
        orderItems: [],
      },
    },
    {
      id: "2",
      tableNumber: 2,
      position: { x: 300, y: 100 },
      status: {
        isOccupied: false,
        guestCount: 0,
        totalAmount: 0,
        orderItems: [],
      },
    },
    {
      id: "3",
      tableNumber: 3,
      position: { x: 500, y: 100 },
      status: {
        isOccupied: false,
        guestCount: 0,
        totalAmount: 0,
        orderItems: [],
      },
    },
  ]);

  const handleTableSelect = (tableId: string) => {
    if (mode === "order") {
      setSelectedTable(tableId);
      setShowOrderSidebar(true);
    }
  };

  const handleFinishTable = (tableId: string) => {
    setSelectedTable(tableId);
    setShowBillingDialog(true);
  };

  const handlePaymentComplete = () => {
    if (selectedTable) {
      setTables(
        tables.map((table) =>
          table.id === selectedTable
            ? {
                ...table,
                status: {
                  isOccupied: false,
                  guestCount: 0,
                  totalAmount: 0,
                  orderItems: [],
                },
              }
            : table,
        ),
      );
      setSelectedTable(null);
      setShowOrderSidebar(false);
      setShowBillingDialog(false);
    }
  };

  const handleUpdateTableOrder = (tableId: string, items: OrderItem[]) => {
    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    setTables(
      tables.map((table) =>
        table.id === tableId
          ? {
              ...table,
              status: {
                ...table.status,
                isOccupied: items.length > 0,
                guestCount: items.length > 0 ? table.status.guestCount || 2 : 0,
                totalAmount,
                orderItems: items,
              },
            }
          : table,
      ),
    );
  };

  const handleSaveLayout = () => {
    // Save the current positions of all tables
    console.log("Saving layout...");
  };

  const selectedTableData = selectedTable
    ? tables.find((t) => t.id === selectedTable)
    : null;

  return (
    <div className="w-screen h-screen flex flex-col bg-background">
      <FloorPlanHeader
        mode={mode}
        onModeChange={setMode}
        onSave={handleSaveLayout}
      />

      <div className="flex-1 relative p-4 overflow-hidden">
        {/* Floor Plan Grid */}
        <div
          className="w-full h-full border rounded-lg bg-accent/10"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            if (!mode === "edit") return;
            e.preventDefault();
            const tableId = e.dataTransfer.getData("text/plain");
            const table = tables.find((t) => t.id === tableId);
            if (table) {
              const rect = e.currentTarget.getBoundingClientRect();
              const offset = JSON.parse(e.dataTransfer.getData("offset"));
              const x = e.clientX - rect.left - offset.x;
              const y = e.clientY - rect.top - offset.y;

              setTables(
                tables.map((t) =>
                  t.id === tableId ? { ...t, position: { x, y } } : t,
                ),
              );
            }
          }}
        >
          {tables.map((table) => (
            <DraggableTable
              key={table.id}
              id={table.id}
              tableNumber={table.tableNumber}
              status={table.status}
              isSelected={selectedTable === table.id}
              isEditMode={mode === "edit"}
              onSelect={() => handleTableSelect(table.id)}
              onBilling={() => handleFinishTable(table.id)}
              style={{
                position: "absolute",
                left: table.position.x,
                top: table.position.y,
              }}
            />
          ))}
        </div>
      </div>

      {/* Order Management Sidebar */}
      <OrderSidebar
        isOpen={showOrderSidebar}
        selectedTable={selectedTable || undefined}
        onClose={() => setShowOrderSidebar(false)}
        onFinishTable={handleFinishTable}
        onUpdateOrder={(items) =>
          selectedTable && handleUpdateTableOrder(selectedTable, items)
        }
        initialItems={selectedTableData?.status.orderItems}
      />

      {/* Billing Dialog */}
      <BillingDialog
        open={showBillingDialog}
        onOpenChange={setShowBillingDialog}
        onPaymentComplete={handlePaymentComplete}
        items={selectedTableData?.status.orderItems}
      />
    </div>
  );
};

export default Home;
