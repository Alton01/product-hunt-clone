import { getOwnerProducts, isUserPremium } from "@/lib/server-actions";
import Image from "next/image";
import Link from "next/link";
import { PiCrown, PiPlus } from "react-icons/pi";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const MyProducts = async () => {
  const authenticatedUser = await auth();

  if (!authenticatedUser) {
    redirect("/");
  }

  const products = await getOwnerProducts();

  const isPremium = await isUserPremium();
  return (
    <div className="mx-auto lg:w-4/5 py-10 px-6">
      {products?.length === 0 ? (
        <div>
          <h1 className="text-3xl font-bold text-center">No Products Found</h1>
          <p className="text-gray-500 text-center">
            Looks like you have not created any products yet. Click the button
            below to get started
          </p>
          <Link href="/new-products">
            <div className="bg-[#ff6154] text-white p-4 rounded-md mt-4 w-60 h-56 flex justify-center items-center flex-col">
              <PiPlus className="text-3xl mb-4" />
              <p className="text-lg">Create a product</p>
            </div>
          </Link>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold text-center">Your Products</h1>
          <p className="text-center text-xl mt-4">
            {" "}
            Manage your products here.
          </p>
          {isPremium ? (
            <div className="flex gap-x-4 items-center mt-10">
              <PiCrown className="text-2xl text-orange-300" />
              <p className="text-lg">You are a premium user</p>
            </div>
          ) : (
            <>
              <p className="pt-6">({products?.length} / 2) free products</p>
            </>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-10">
            {products?.map((product) => (
              <Link href={`/edit/${product.id}`} key={product.id}>
                <div>
                  <div
                    className="rounded-lg hover:scale-105 transition-transform duration-300
                            transform ease-in-out justify-center items-center border p-2"
                  >
                    <Image
                      src={product.logo}
                      alt="logo"
                      width={1000}
                      height={1000}
                      className="object-center rounded-lg h-64 w-full"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProducts;
