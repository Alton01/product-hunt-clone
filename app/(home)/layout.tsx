import { auth } from "@/auth";
import Navbar from "@/components/navbar/navbar";
import Spinner from "@/components/spinner";
import {
  getNotifications,
  getProductsByUserId,
  isUserPremium,
} from "@/lib/server-actions";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const NewProductLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const authenticatedUser = await auth();

  const notifications = await getNotifications();

  const products = await getProductsByUserId(authenticatedUser?.user?.id || "");

  const isPremium = await isUserPremium();

  if (!isPremium && products.length === 2) {
    redirect("/");
  }

  if (!authenticatedUser) {
    redirect("/");
  }

  return (
    <html lang="en">
      <body>
        <Suspense fallback={<Spinner />}>
          <Navbar
            authenticatedUser={authenticatedUser}
            notifications={notifications}
            products={products}
          />
          {children}
        </Suspense>
      </body>
    </html>
  );
};

export default NewProductLayout;
