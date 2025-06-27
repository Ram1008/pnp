import { Book, BookOpen, Briefcase, FileSpreadsheet, LineChart, NotebookPen, Palette, PenTool } from "lucide-react";

export const stationeryCategories = [
    { id: "notebooks", name: "Notebooks", icon: <NotebookPen size={24} /> },
    { id: "pens-markers", name: "Pens & Markers", icon: <PenTool size={24} /> },
    { id: "art-supplies", name: "Art Supplies", icon: <Palette size={24} /> },
    {
      id: "geometry-tools",
      name: "Geometry Tool Boxes",
      icon: <Book size={24} />,
    },
    {
      id: "craft-supplies",
      name: "Craft Supplies",
      icon: <Briefcase size={24} />,
    },
    {
      id: "charts-maps",
      name: "Charts and maps",
      icon: <LineChart size={24} />,
    },
    {
      id: "children-books",
      name: "Children books",
      icon: <BookOpen size={24} />,
    },
    {
      id: "files-calculators",
      name: "Files & Calculators",
      icon: <FileSpreadsheet size={24} />,
    },
  ];

  export const customPrintCategories = [
    { id: "tshirt", name: "Tshirt", icon: <NotebookPen size={24} /> },
    { id: "mugs", name: "Mugs", icon: <PenTool size={24} /> },
    { id: "pens-markers", name: "Pens & Markers", icon: <PenTool size={24} /> },
    { id: "art-supplies", name: "Art Supplies", icon: <Palette size={24} /> },
    {
      id: "craft-supplies",
      name: "Craft Supplies",
      icon: <Briefcase size={24} />,
    },
    {
      id: "charts-maps",
      name: "Charts and maps",
      icon: <LineChart size={24} />,
    },
    {
      id: "children-books",
      name: "Children books",
      icon: <BookOpen size={24} />,
    },
    {
      id: "files-calculators",
      name: "Files & Calculators",
      icon: <FileSpreadsheet size={24} />,
    },
  ];

  export const bottomTabs = [
    { label: "Stationery", path: "/stationery" },
    { label: "Custom Prints", path: "/custom-print" },
    { label: "View Cart", path: "/cart" },
  ];

  export const vendors = [
    {
      name: "PrintHub Services",
      address: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      deliveryTime: "15 min",
      status: "Available", //green
    },
    {
      name: "Quick Print Solutions",
      address: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      deliveryTime: "15 min",
      status: "Occupied", //yellow
    },
    {
      name: "Premium Prints",
      address: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      deliveryTime: "15 min",
      status: "Busy", //red
    },
    {
      name: "Budget Prints",
      address: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      deliveryTime: "15 min",
      status: "Occupied", //yellow
    }
  ];

  export const orders = [
    {
      id: 1,
      product: "Business Cards",
      status: "Processing",
      date: "12-06-2025",
    },
    { id: 2, product: "Stickers", status: "Shipped", date: "18-06-2025" },
    { id: 3, product: "Posters", status: "Delivered", date: "20-06-2025" },
  ];