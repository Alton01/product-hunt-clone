import NewProduct from "./NewProduct";
import { auth } from "@/auth";
import {
  getNotifications,
  getProductsByUserId,
  isUserPremium,
} from "@/lib/server-actions";
import { redirect } from "next/navigation";

const page = async () => {
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
    <>
      <NewProduct isPremium={isPremium} products={products} />
    </>
  );
};

export default page;
