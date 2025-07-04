
import { GlobalProvider } from "@/context/GlobalContext";
import "./globals.css";

export const metadata = {
  title: "Print N Parcel",
  description: "Generated by create ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GlobalProvider>
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}
