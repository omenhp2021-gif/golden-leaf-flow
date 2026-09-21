import React from "react";
import { useShopify } from "@/contexts/ShopifyContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingBag, 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  ExternalLink, 
  ShoppingBasket,
  AlertTriangle,
  AlertCircle
} from "lucide-react";

export const FloatingCart = () => {
  const { 
    cartItems, 
    totalCount, 
    totalPrice, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    removeUnavailableItems,
    getCartUrl,
    isVariantAvailable,
    getItemPrice,
    hasUnavailableItems,
    isCartOpen,
    setIsCartOpen
  } = useShopify();

  const availableCount = cartItems.filter((i) => isVariantAvailable(i.variantId)).length;

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsCartOpen(!isCartOpen)}
          aria-label="Open Cart"
          className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-gradient-gold text-accent-foreground shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-tea-gold-light/60 ring-4 ring-primary/10"
        >
          <ShoppingBag className="w-6 h-6 text-foreground transition-transform group-hover:rotate-12" />

          {/* Badge Counter */}
          {totalCount > 0 && (
            <span className={`absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-6 h-6 px-1.5 rounded-full text-xs font-extrabold shadow-md border border-background animate-pulse ${
              hasUnavailableItems ? "bg-amber-600 text-white" : "bg-gradient-green text-primary-foreground"
            }`}>
              {totalCount}
            </span>
          )}
        </button>
      </div>

      {/* Cart Drawer / Modal Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in">
          {/* Backdrop click to close */}
          <div 
            className="flex-1" 
            onClick={() => setIsCartOpen(false)} 
          />

          {/* Drawer Content */}
          <div className="w-full max-w-md bg-background h-full shadow-2xl flex flex-col border-l border-border animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="p-5 border-b border-border flex items-center justify-between bg-muted/40">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-gold/20 border border-tea-gold-light/30">
                  <ShoppingBag className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">Your Tea Cart</h2>
                  <p className="text-xs text-muted-foreground">
                    {totalCount === 0 
                      ? "Your cart is currently empty" 
                      : `${totalCount} item${totalCount > 1 ? "s" : ""} in cart`}
                  </p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsCartOpen(false)}
                className="rounded-full hover:bg-muted"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Out of stock alert banner if any item is unavailable */}
            {hasUnavailableItems && (
              <div className="bg-amber-500/10 border-b border-amber-500/20 px-5 py-3 flex items-center justify-between gap-3 text-amber-600 dark:text-amber-400">
                <div className="flex items-center gap-2 text-xs font-medium">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>Some items in your cart are currently out of stock on Shopify.</span>
                </div>
                <button
                  onClick={removeUnavailableItems}
                  className="text-xs font-bold underline hover:opacity-80 transition-opacity whitespace-nowrap flex-shrink-0"
                >
                  Clear Unavailable
                </button>
              </div>
            )}

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-muted-foreground">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <ShoppingBasket className="w-8 h-8 text-muted-foreground/60" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-1">No teas added yet</h3>
                  <p className="text-sm text-muted-foreground max-w-xs mb-6">
                    Browse our premium organic teas and add your favorite blends to your cart.
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setIsCartOpen(false);
                      const productsElem = document.querySelector("#products");
                      if (productsElem) productsElem.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Explore Teas
                  </Button>
                </div>
              ) : (
                cartItems.map((item) => {
                  const isAvailable = isVariantAvailable(item.variantId);
                  const currentPrice = getItemPrice(item.variantId, item.price);

                  return (
                    <div 
                      key={item.variantId} 
                      className={`flex gap-4 p-3 rounded-xl border transition-colors relative ${
                        isAvailable 
                          ? "border-border bg-card hover:border-primary/30" 
                          : "border-destructive/30 bg-destructive/5 opacity-80"
                      }`}
                    >
                      {/* Item Image */}
                      <img 
                        src={item.image} 
                        alt={item.productName} 
                        className={`w-16 h-16 object-cover rounded-lg flex-shrink-0 border ${
                          isAvailable ? "border-border" : "border-destructive/40 grayscale"
                        }`}
                      />

                      {/* Item Details */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="font-semibold text-sm line-clamp-1 text-foreground">
                              {item.productName}
                            </h4>
                            <button 
                              onClick={() => removeFromCart(item.variantId)}
                              className="text-muted-foreground hover:text-destructive transition-colors p-1"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <Badge variant="secondary" className="text-[11px]">
                              {item.weight}
                            </Badge>

                            {/* Live Availability Badge */}
                            {!isAvailable ? (
                              <Badge variant="destructive" className="text-[10px] px-2 py-0.5 font-bold">
                                Out of Stock
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-[10px] px-2 py-0.5 text-emerald-600 border-emerald-600/30 dark:text-emerald-400">
                                In Stock
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Quantity & Price */}
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/50">
                          <div className="flex items-center border border-border rounded-lg bg-muted/30">
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                              className="p-1 hover:bg-muted transition-colors rounded-l-lg"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-2.5 text-xs font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                              className="p-1 hover:bg-muted transition-colors rounded-r-lg"
                              disabled={!isAvailable}
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className={`font-bold text-sm ${isAvailable ? "text-primary" : "text-muted-foreground line-through"}`}>
                            ₹{(currentPrice * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer / Checkout Actions */}
            {cartItems.length > 0 && (
              <div className="p-5 border-t border-border bg-muted/30 space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Subtotal</span>
                    <span>₹{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-foreground pt-1 border-t border-border/50">
                    <span>Total Amount</span>
                    <span className="text-primary text-xl">₹{totalPrice.toFixed(2)}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground text-center">
                    Taxes and shipping calculated at Shopify checkout.
                  </p>
                </div>

                <div className="space-y-2">
                  {availableCount > 0 ? (
                    <Button 
                      size="lg"
                      className="w-full bg-gradient-green hover:opacity-90 shadow-lg text-primary-foreground font-bold py-6 group"
                      asChild
                    >
                      <a 
                        href={getCartUrl()} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <span>Checkout on Shopify ({availableCount} Item{availableCount > 1 ? "s" : ""})</span>
                        <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  ) : (
                    <Button 
                      size="lg"
                      disabled
                      className="w-full bg-muted text-muted-foreground font-bold py-6 cursor-not-allowed opacity-70"
                    >
                      <span>Items Currently Out of Stock</span>
                    </Button>
                  )}

                  <div className="flex justify-between text-xs text-muted-foreground pt-1 px-1">
                    <button 
                      onClick={clearCart}
                      className="hover:text-destructive underline transition-colors"
                    >
                      Clear Cart
                    </button>
                    <a
                      href="https://kaziranga-tea-factory-2.myshopify.com/cart"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary underline flex items-center gap-1 transition-colors"
                    >
                      <span>Direct Shopify Cart</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

