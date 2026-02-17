"use client";

import { useState } from "react";
import { CostPerWearDashboard } from "@/components/cost-per-wear";
import { WardrobeItem } from "@/lib/cost-per-wear-types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, ArrowLeft, Sparkles, Shirt } from "lucide-react";
import Link from "next/link";

// Demo data for development
const DEMO_ITEMS: WardrobeItem[] = [
  {
    id: "1",
    name: "Classic White Shirt",
    category: "Tops",
    subcategory: "Shirts",
    color: "White",
    brand: "Uniqlo",
    purchasePrice: 45,
    purchaseDate: new Date("2024-01-15"),
    timesWorn: 28,
    lastWorn: new Date("2025-02-15"),
    condition: "good",
    isFavorite: true,
  },
  {
    id: "2",
    name: "Navy Blazer",
    category: "Outerwear",
    subcategory: "Blazers",
    color: "Navy",
    brand: "Zara",
    purchasePrice: 120,
    purchaseDate: new Date("2024-03-10"),
    timesWorn: 15,
    lastWorn: new Date("2025-02-10"),
    condition: "excellent",
    isFavorite: true,
  },
  {
    id: "3",
    name: "Black Jeans",
    category: "Bottoms",
    subcategory: "Jeans",
    color: "Black",
    brand: "Levi's",
    purchasePrice: 80,
    purchaseDate: new Date("2024-02-01"),
    timesWorn: 42,
    lastWorn: new Date("2025-02-17"),
    condition: "good",
    isFavorite: true,
  },
  {
    id: "4",
    name: "Leather Boots",
    category: "Shoes",
    subcategory: "Boots",
    color: "Brown",
    brand: "Dr. Martens",
    purchasePrice: 180,
    purchaseDate: new Date("2024-01-20"),
    timesWorn: 35,
    lastWorn: new Date("2025-02-16"),
    condition: "good",
    isFavorite: true,
  },
  {
    id: "5",
    name: "Summer Dress",
    category: "Dresses",
    subcategory: "Casual",
    color: "Floral",
    brand: "H&M",
    purchasePrice: 35,
    purchaseDate: new Date("2024-05-01"),
    timesWorn: 8,
    lastWorn: new Date("2024-08-15"),
    condition: "excellent",
    isFavorite: false,
  },
  {
    id: "6",
    name: "Wool Coat",
    category: "Outerwear",
    subcategory: "Coats",
    color: "Camel",
    brand: "Mango",
    purchasePrice: 250,
    purchaseDate: new Date("2024-11-01"),
    timesWorn: 12,
    lastWorn: new Date("2025-02-14"),
    condition: "excellent",
    isFavorite: true,
  },
  {
    id: "7",
    name: "Silk Scarf",
    category: "Accessories",
    subcategory: "Scarves",
    color: "Multicolor",
    brand: "Vintage",
    purchasePrice: 25,
    purchaseDate: new Date("2024-06-15"),
    timesWorn: 3,
    lastWorn: new Date("2025-01-20"),
    condition: "excellent",
    isFavorite: false,
  },
  {
    id: "8",
    name: "Running Sneakers",
    category: "Shoes",
    subcategory: "Sneakers",
    color: "White",
    brand: "Nike",
    purchasePrice: 95,
    purchaseDate: new Date("2024-04-01"),
    timesWorn: 55,
    lastWorn: new Date("2025-02-18"),
    condition: "fair",
    isFavorite: true,
  },
  {
    id: "9",
    name: "Cashmere Sweater",
    category: "Tops",
    subcategory: "Sweaters",
    color: "Gray",
    brand: "Everlane",
    purchasePrice: 150,
    purchaseDate: new Date("2024-10-01"),
    timesWorn: 18,
    lastWorn: new Date("2025-02-12"),
    condition: "excellent",
    isFavorite: true,
  },
  {
    id: "10",
    name: "Linen Trousers",
    category: "Bottoms",
    subcategory: "Trousers",
    color: "Beige",
    brand: "COS",
    purchasePrice: 89,
    purchaseDate: new Date("2024-06-01"),
    timesWorn: 6,
    lastWorn: new Date("2024-09-10"),
    condition: "good",
    isFavorite: false,
  },
];

export default function WardrobeValuePage() {
  const [items, setItems] = useState<WardrobeItem[]>(DEMO_ITEMS);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState<Partial<WardrobeItem>>({
    category: "Tops",
    condition: "new",
    timesWorn: 0,
    purchaseDate: new Date(),
  });

  const handleLogWear = (itemId: string) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === itemId
          ? { ...it, timesWorn: it.timesWorn + 1, lastWorn: new Date() }
          : it
      )
    );
  };

  const handleAddItem = () => {
    if (!newItem.name || !newItem.purchasePrice) return;

    const item: WardrobeItem = {
      id: Math.random().toString(36).substring(7),
      name: newItem.name,
      category: newItem.category || "Tops",
      subcategory: newItem.subcategory || "",
      color: newItem.color || "",
      brand: newItem.brand,
      purchasePrice: Number(newItem.purchasePrice),
      purchaseDate: newItem.purchaseDate || new Date(),
      timesWorn: 0,
      condition: (newItem.condition as WardrobeItem["condition"]) || "new",
      isFavorite: false,
    };

    setItems((prev) => [...prev, item]);
    setIsAddDialogOpen(false);
    setNewItem({
      category: "Tops",
      condition: "new",
      timesWorn: 0,
      purchaseDate: new Date(),
    });
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <header className="bg-white dark:bg-zinc-900 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/wardrobe">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-xl font-bold">Wardrobe Value Tracker</h1>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Track cost-per-wear and celebrate your sustainable choices
              </p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Item</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Item Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Blue Oxford Shirt"
                      value={newItem.name || ""}
                      onChange={(e) =>
                        setNewItem((prev) => ({ ...prev, name: e.target.value }))
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Purchase Price ($)</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="0.00"
                        value={newItem.purchasePrice || ""}
                        onChange={(e) =>
                          setNewItem((prev) => ({
                            ...prev,
                            purchasePrice: Number(e.target.value),
                          }))
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select
                        value={newItem.category}
                        onValueChange={(value) =>
                          setNewItem((prev) => ({ ...prev, category: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[
                            "Tops",
                            "Bottoms",
                            "Dresses",
                            "Outerwear",
                            "Shoes",
                            "Accessories",
                          ].map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="color">Color</Label>
                      <Input
                        id="color"
                        placeholder="e.g., Navy"
                        value={newItem.color || ""}
                        onChange={(e) =>
                          setNewItem((prev) => ({ ...prev, color: e.target.value }))
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="brand">Brand (Optional)</Label>
                      <Input
                        id="brand"
                        placeholder="e.g., Uniqlo"
                        value={newItem.brand || ""}
                        onChange={(e) =>
                          setNewItem((prev) => ({ ...prev, brand: e.target.value }))
                        }
                      />
                    </div>
                  </div>

                  <Button onClick={handleAddItem} className="w-full">
                    Add to Wardrobe
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-0">
            <CardContent className="py-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 rounded-lg">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-emerald-100 text-sm">Smart Shopping</p>
                  <p className="text-2xl font-bold">You\'re doing great!</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-emerald-100">
                Tracking cost-per-wear helps you make better fashion choices and reduces waste.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="py-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Shirt className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm">Wardrobe Size</p>
                  <p className="text-2xl font-bold">{items.length} items</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="py-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                  <Sparkles className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm">Total Wears Logged</p>
                  <p className="text-2xl font-bold">
                    {items.reduce((sum, item) => sum + item.timesWorn, 0)} wears
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard */}
        <CostPerWearDashboard items={items} onLogWear={handleLogWear} />
      </main>
    </div>
  );
}
