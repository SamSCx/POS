import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
}

interface ProductGridProps {
  products?: Product[];
  onProductSelect?: (product: Product) => void;
}

const ProductGrid = ({
  products = [
    {
      id: "1",
      name: "Cola",
      price: 2.5,
      image: "https://dummyimage.com/100/e0e0e0/666666&text=Cola",
      description: "Refreshing cola drink",
    },
    {
      id: "2",
      name: "Water",
      price: 1.5,
      image: "https://dummyimage.com/100/e0e0e0/666666&text=Water",
      description: "Still mineral water",
    },
    {
      id: "3",
      name: "Coffee",
      price: 3.0,
      image: "https://dummyimage.com/100/e0e0e0/666666&text=Coffee",
      description: "Hot brewed coffee",
    },
  ],
  onProductSelect = () => {},
}: ProductGridProps) => {
  return (
    <ScrollArea className="h-[500px] w-full bg-background p-4">
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <Card
            key={product.id}
            className="flex flex-col p-3 hover:bg-accent/50 cursor-pointer transition-colors"
            onClick={() => onProductSelect(product)}
          >
            <div className="aspect-square w-full overflow-hidden rounded-lg bg-muted">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-muted">
                  <span className="text-muted-foreground">No image</span>
                </div>
              )}
            </div>

            <div className="mt-3 space-y-1">
              <h3 className="font-medium leading-none">{product.name}</h3>
              {product.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {product.description}
                </p>
              )}
              <div className="flex items-center justify-between">
                <span className="font-semibold">
                  ${product.price.toFixed(2)}
                </span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    onProductSelect(product);
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ProductGrid;
