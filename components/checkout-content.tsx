"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ShoppingBag, Truck, Store, Search, Lock, HelpCircle } from "lucide-react"

interface CheckoutItem {
  id: string
  name: string
  price: number
  image: string
  color: string
  size: string
  quantity: number
}

export function CheckoutContent() {
  const [email, setEmail] = useState("")
  const [emailOffers, setEmailOffers] = useState(false)
  const [deliveryMethod, setDeliveryMethod] = useState("ship")
  const [country, setCountry] = useState("United Kingdom")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [address, setAddress] = useState("")
  const [apartment, setApartment] = useState("")
  const [city, setCity] = useState("")
  const [postcode, setPostcode] = useState("")
  const [saveInfo, setSaveInfo] = useState(false)
  const [giftCard, setGiftCard] = useState("")

  // Payment form states
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [cardNumber, setCardNumber] = useState("")
  const [expirationDate, setExpirationDate] = useState("")
  const [securityCode, setSecurityCode] = useState("")
  const [nameOnCard, setNameOnCard] = useState("")
  const [useSameAddress, setUseSameAddress] = useState(true)

  const checkoutItems: CheckoutItem[] = [
    {
      id: "1",
      name: "Jegging For Girls",
      price: 488.0,
      image: "/placeholder.svg?height=80&width=80",
      color: "Black",
      size: "XL",
      quantity: 1,
    },
    {
      id: "2",
      name: "FITNESS Women, Unisex, Men Shapewear",
      price: 188.0,
      image: "/placeholder.svg?height=80&width=80",
      color: "Black",
      size: "XL",
      quantity: 1,
    },
  ]

  const subtotal = checkoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 0 // Free shipping
  const total = subtotal + shipping

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent"
            >
              Focus
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Left Column - Checkout Form */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Contact</h2>
                <Link href="/login" className="text-sm text-blue-600 hover:text-blue-700">
                  Log in
                </Link>
              </div>
              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="Email or mobile phone number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
                <label className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    checked={emailOffers}
                    onChange={(e) => setEmailOffers(e.target.checked)}
                    className="rounded"
                  />
                  <span>Email me with news and offers</span>
                </label>
              </div>
            </div>

            {/* Delivery Method */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Delivery</h2>
              <div className="space-y-3">
                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    deliveryMethod === "ship" ? "border-black bg-gray-50" : "border-gray-300"
                  }`}
                  onClick={() => setDeliveryMethod("ship")}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        checked={deliveryMethod === "ship"}
                        onChange={() => setDeliveryMethod("ship")}
                        className="text-black"
                      />
                      <Truck className="h-5 w-5" />
                      <span className="font-medium">Ship</span>
                    </div>
                    <span className="text-sm text-gray-600">FREE</span>
                  </div>
                </div>

                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    deliveryMethod === "pickup" ? "border-black bg-gray-50" : "border-gray-300"
                  }`}
                  onClick={() => setDeliveryMethod("pickup")}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      checked={deliveryMethod === "pickup"}
                      onChange={() => setDeliveryMethod("pickup")}
                      className="text-black"
                    />
                    <Store className="h-5 w-5" />
                    <span className="font-medium">Pickup in store</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            {deliveryMethod === "ship" && (
              <div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="country">Country/Region</Label>
                    <Select value={country} onValueChange={setCountry}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                        <SelectItem value="United States">United States</SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="Australia">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Input
                        placeholder="First name (optional)"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div>
                      <Input placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                  </div>

                  <div className="relative">
                    <Input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                    <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  </div>

                  <Input
                    placeholder="Apartment, suite, etc. (optional)"
                    value={apartment}
                    onChange={(e) => setApartment(e.target.value)}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                    <Input placeholder="Postcode" value={postcode} onChange={(e) => setPostcode(e.target.value)} />
                  </div>

                  <label className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={saveInfo}
                      onChange={(e) => setSaveInfo(e.target.checked)}
                      className="rounded"
                    />
                    <span>Save this information for next time</span>
                  </label>
                </div>
              </div>
            )}

            {/* Shipping Method */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping method</h2>
              <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                Enter your shipping address to view available shipping methods.
              </div>
            </div>

            {/* Payment Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Payment</h2>
              <p className="text-sm text-gray-600 mb-6">All transactions are secure and encrypted.</p>

              <div className="space-y-4">
                {/* Payment Method Selection */}
                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    paymentMethod === "credit-card" ? "border-black bg-gray-50" : "border-gray-300"
                  }`}
                  onClick={() => setPaymentMethod("credit-card")}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        checked={paymentMethod === "credit-card"}
                        onChange={() => setPaymentMethod("credit-card")}
                        className="text-black"
                      />
                      <span className="font-medium">Credit card</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-6 bg-orange-500 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">B</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Credit Card Form */}
                {paymentMethod === "credit-card" && (
                  <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
                    <div className="relative">
                      <Input
                        placeholder="Card number"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="pr-10"
                      />
                      <Lock className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="Expiration date (MM / YY)"
                        value={expirationDate}
                        onChange={(e) => setExpirationDate(e.target.value)}
                      />
                      <div className="relative">
                        <Input
                          placeholder="Security code"
                          value={securityCode}
                          onChange={(e) => setSecurityCode(e.target.value)}
                          className="pr-10"
                        />
                        <HelpCircle className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                      </div>
                    </div>

                    <Input
                      placeholder="Name on card"
                      value={nameOnCard}
                      onChange={(e) => setNameOnCard(e.target.value)}
                    />

                    <label className="flex items-center space-x-2 text-sm">
                      <input
                        type="checkbox"
                        checked={useSameAddress}
                        onChange={(e) => setUseSameAddress(e.target.checked)}
                        className="rounded"
                      />
                      <span>Use shipping address as billing address</span>
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Pay Now Button */}
            <Button className="w-full bg-black text-white hover:bg-gray-800 py-4 text-lg font-medium">Pay now</Button>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:pl-8">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order summary</h2>

              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {checkoutItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="relative">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="rounded-lg object-cover"
                      />
                      <div className="absolute -top-2 -right-2 bg-gray-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        {item.color} / {item.size}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">£{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Gift Card */}
              <div className="mb-6">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Gift card"
                    value={giftCard}
                    onChange={(e) => setGiftCard(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline">Apply</Button>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Order Totals */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal • {checkoutItems.length} items</span>
                  <span>£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Enter shipping address" : `£${shipping.toFixed(2)}`}</span>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>
                  <span className="text-sm font-normal text-gray-600 mr-2">GBP</span>£{total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-500 border-t">All rights reserved hint-fashion</footer>
    </div>
  )
}
