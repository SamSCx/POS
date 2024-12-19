import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
}

interface CategoryTabsProps {
  categories?: Category[];
  selectedCategory?: string;
  onCategoryChange?: (categoryId: string) => void;
}

const CategoryTabs = ({
  categories = [
    { id: "drinks", name: "Drinks" },
    { id: "food", name: "Food" },
    { id: "shisha", name: "Shisha" },
    { id: "desserts", name: "Desserts" },
    { id: "specials", name: "Specials" },
  ],
  selectedCategory = "drinks",
  onCategoryChange = () => {},
}: CategoryTabsProps) => {
  return (
    <div className="w-full bg-background border-b">
      <ScrollArea className="w-full whitespace-nowrap">
        <Tabs
          value={selectedCategory}
          onValueChange={onCategoryChange}
          className="w-full"
        >
          <TabsList className="h-12 w-full justify-start gap-2 bg-transparent p-2">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className={cn(
                  "rounded-lg px-3 py-1.5",
                  "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                )}
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  );
};

export default CategoryTabs;
