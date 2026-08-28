"use client";

import React, { useState, useMemo } from "react";
import { StoreOrder, OrderStatus } from "@/types";
import { formatPrice } from "@/lib/price-utils";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import {
  Search,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  Truck,
  Package,
  AlertTriangle,
  XCircle,
  Eye,
  Printer,
  ChevronDown,
  CreditCard,
  Banknote,
  Smartphone,
  ExternalLink,
} from "lucide-react";

interface StoreOrdersTableProps {
  orders: StoreOrder[];
  onUpdateStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  loading?: boolean;
}

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; bg: string; text: string; border: string; icon: React.ReactNode }
> = {
  pending: {
    label: "Pending Verification",
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    icon: <Clock size={12} className="text-amber-600" />,
  },
  processing: {
    label: "Processing / Packaging",
    bg: "bg-sky-50",
    text: "text-sky-700",
    border: "border-sky-200",
    icon: <Package size={12} className="text-sky-600" />,
  },
  shipped: {
    label: "Shipped / In Courier",
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-200",
    icon: <Truck size={12} className="text-purple-600" />,
  },
  delivered: {
    label: "Delivered & Paid",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    icon: <CheckCircle2 size={12} className="text-emerald-600" />,
  },
  cancelled: {
    label: "Cancelled",
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-200",
    icon: <XCircle size={12} className="text-rose-600" />,
  },
};

export const StoreOrdersTable: React.FC<StoreOrdersTableProps> = ({
  orders,
  onUpdateStatus,
  loading = false,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<"all" | OrderStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeOrderModal, setActiveOrderModal] = useState<StoreOrder | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesStatus = selectedStatus === "all" || o.status === selectedStatus;
      const q = searchQuery.toLowerCase();
      const matchesQuery =
        !q ||
        o.id.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerPhone.includes(q) ||
        (o.customerEmail && o.customerEmail.toLowerCase().includes(q));
      return matchesStatus && matchesQuery;
    });
  }, [orders, selectedStatus, searchQuery]);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    setUpdatingId(orderId);
    try {
      await onUpdateStatus(orderId, newStatus);
      if (activeOrderModal && activeOrderModal.id === orderId) {
        setActiveOrderModal((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } catch (err) {
      console.error("Error updating order status:", err);
      alert("Failed to update order status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const counts = useMemo(() => {
    return {
      all: orders.length,
      pending: orders.filter((o) => o.status === "pending").length,
      processing: orders.filter((o) => o.status === "processing").length,
      shipped: orders.filter((o) => o.status === "shipped").length,
      delivered: orders.filter((o) => o.status === "delivered").length,
      cancelled: orders.filter((o) => o.status === "cancelled").length,
      revenue: orders
        .filter((o) => o.status !== "cancelled")
        .reduce((sum, o) => sum + (o.total || 0), 0),
    };
  }, [orders]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Telemetry Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 space-y-1 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Total Orders
          </span>
          <span className="text-2xl font-bold text-slate-900 tabular-nums">
            {counts.all}
          </span>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 space-y-1 shadow-2xs">
          <span className="text-[11px] font-semibold text-amber-600 uppercase tracking-wider block">
            Needs Action
          </span>
          <span className="text-2xl font-bold text-amber-700 tabular-nums">
            {counts.pending + counts.processing}
          </span>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 space-y-1 shadow-2xs">
          <span className="text-[11px] font-semibold text-purple-600 uppercase tracking-wider block">
            In Transit
          </span>
          <span className="text-2xl font-bold text-purple-700 tabular-nums">
            {counts.shipped}
          </span>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 space-y-1 shadow-2xs">
          <span className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider block">
            Store Gross Sales
          </span>
          <span className="text-2xl font-bold text-slate-900 tabular-nums">
            {formatPrice(counts.revenue)}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search orders, phone, customer..."
            className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs font-medium placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {(["all", "pending", "processing", "shipped", "delivered", "cancelled"] as const).map(
            (status) => {
              const isSelected = selectedStatus === status;
              const count = status === "all" ? counts.all : counts[status];
              return (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/80"
                  }`}
                >
                  <span className="capitalize">{status}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold tabular-nums ${
                      isSelected ? "bg-white/20 text-white" : "bg-white text-slate-700"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            }
          )}
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-12 text-center shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <Package size={22} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">No Orders Found</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              {orders.length === 0
                ? "Your store has not received any orders yet. Share your store link on WhatsApp, Facebook, or Instagram to start getting sales!"
                : "No orders match the selected filters."}
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Order ID &amp; Date</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Items</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Payment</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredOrders.map((order) => {
                  const statusInfo = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
                  const dateStr = order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Recent";

                  return (
                    <tr key={order.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Order ID & Date */}
                      <td className="py-3.5 px-4">
                        <div className="font-mono font-bold text-slate-900">
                          #{order.id.slice(-6).toUpperCase()}
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <Clock size={11} className="text-slate-400" />
                          <span>{dateStr}</span>
                        </div>
                      </td>

                      {/* Customer */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{order.customerName}</div>
                        <div className="text-[11px] text-slate-600 flex items-center gap-1 mt-0.5">
                          <Phone size={10} className="text-slate-400" />
                          <a
                            href={`tel:${order.customerPhone}`}
                            className="hover:text-sky-600 underline-offset-2"
                          >
                            {order.customerPhone}
                          </a>
                        </div>
                        <div className="text-[10px] text-slate-500 truncate max-w-[180px] mt-0.5">
                          {order.deliveryArea === "inside_dhaka" ? "📍 Dhaka" : "📍 Outside Dhaka"} • {order.shippingAddress}
                        </div>
                      </td>

                      {/* Items */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-800">
                          {order.items.length} {order.items.length === 1 ? "Item" : "Items"}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate max-w-[200px]">
                          {order.items.map((i) => `${i.qty}x ${i.name}`).join(", ")}
                        </div>
                      </td>

                      {/* Total */}
                      <td className="py-3.5 px-4 font-bold text-slate-900 tabular-nums">
                        {formatPrice(order.total)}
                      </td>

                      {/* Payment Method */}
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                          {order.paymentMethod === "cod" ? (
                            <>
                              <Banknote size={10} className="text-emerald-600" />
                              <span>Cash on Delivery</span>
                            </>
                          ) : order.paymentMethod === "bkash" ? (
                            <>
                              <Smartphone size={10} className="text-rose-600" />
                              <span>bKash / Mobile</span>
                            </>
                          ) : (
                            <>
                              <CreditCard size={10} className="text-sky-600" />
                              <span>Card / Online</span>
                            </>
                          )}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${statusInfo.bg} ${statusInfo.text} ${statusInfo.border}`}
                          >
                            {statusInfo.icon}
                            <span>{statusInfo.label}</span>
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setActiveOrderModal(order)}
                            leftIcon={<Eye size={12} />}
                          >
                            View
                          </Button>

                          {/* Quick Status Next Action */}
                          {order.status === "pending" && (
                            <button
                              onClick={() => handleStatusChange(order.id, "processing")}
                              disabled={updatingId === order.id}
                              className="px-2.5 py-1 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                            >
                              Process
                            </button>
                          )}
                          {order.status === "processing" && (
                            <button
                              onClick={() => handleStatusChange(order.id, "shipped")}
                              disabled={updatingId === order.id}
                              className="px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                            >
                              Ship
                            </button>
                          )}
                          {order.status === "shipped" && (
                            <button
                              onClick={() => handleStatusChange(order.id, "delivered")}
                              disabled={updatingId === order.id}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                            >
                              Deliver
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {activeOrderModal && (
        <Modal
          isOpen={Boolean(activeOrderModal)}
          onClose={() => setActiveOrderModal(null)}
          title={`Order #${activeOrderModal.id.slice(-6).toUpperCase()}`}
        >
          <div className="space-y-5 max-h-[80vh] overflow-y-auto pr-1">
            {/* Header info */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
                <div>
                  <span className="text-xs text-slate-500 block">Placed On</span>
                  <span className="text-xs font-bold text-slate-900">
                    {new Date(activeOrderModal.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                      STATUS_CONFIG[activeOrderModal.status].bg
                    } ${STATUS_CONFIG[activeOrderModal.status].text} ${
                      STATUS_CONFIG[activeOrderModal.status].border
                    }`}
                  >
                    {STATUS_CONFIG[activeOrderModal.status].icon}
                    <span>{STATUS_CONFIG[activeOrderModal.status].label}</span>
                  </span>
                </div>
              </div>

              {/* Customer & Delivery Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <h5 className="font-bold text-slate-900 mb-1">Customer Details</h5>
                  <p className="text-slate-800 font-medium">{activeOrderModal.customerName}</p>
                  <p className="text-slate-600 font-mono mt-0.5">
                    <a
                      href={`tel:${activeOrderModal.customerPhone}`}
                      className="text-sky-600 font-bold hover:underline"
                    >
                      {activeOrderModal.customerPhone}
                    </a>
                  </p>
                  {activeOrderModal.customerEmail && (
                    <p className="text-slate-500 mt-0.5">{activeOrderModal.customerEmail}</p>
                  )}
                  <div className="mt-2">
                    <a
                      href={`https://wa.me/${activeOrderModal.customerPhone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 hover:bg-emerald-100"
                    >
                      <span>Chat on WhatsApp</span>
                      <ExternalLink size={10} />
                    </a>
                  </div>
                </div>

                <div>
                  <h5 className="font-bold text-slate-900 mb-1">Shipping &amp; Delivery</h5>
                  <p className="text-slate-600 font-medium">
                    {activeOrderModal.deliveryArea === "inside_dhaka"
                      ? "Inside Dhaka (৳60)"
                      : "Outside Dhaka (৳120)"}
                  </p>
                  <p className="text-slate-800 mt-1 leading-relaxed bg-white p-2 rounded-lg border border-slate-200">
                    {activeOrderModal.shippingAddress}
                  </p>
                  {activeOrderModal.notes && (
                    <p className="text-slate-500 mt-1.5 italic text-[11px]">
                      <strong>Note:</strong> &ldquo;{activeOrderModal.notes}&rdquo;
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Items table */}
            <div className="space-y-2">
              <h5 className="font-bold text-slate-900 text-xs">Purchased Products</h5>
              <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 text-xs">
                {activeOrderModal.items.map((item, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 shrink-0 overflow-hidden flex items-center justify-center">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <Package size={16} className="text-slate-400" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-slate-900 truncate">{item.name}</p>
                        <p className="text-[11px] text-slate-500">
                          {formatPrice(item.price)} × {item.qty}
                        </p>
                      </div>
                    </div>
                    <div className="font-bold text-slate-900 tabular-nums shrink-0">
                      {formatPrice(item.price * item.qty)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-bold text-slate-900 tabular-nums">
                  {formatPrice(activeOrderModal.subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge:</span>
                <span className="font-bold text-slate-900 tabular-nums">
                  +{formatPrice(activeOrderModal.shippingCost)}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-bold text-slate-900">
                <span>Total Payable:</span>
                <span className="text-base text-slate-900 tabular-nums">
                  {formatPrice(activeOrderModal.total)}
                </span>
              </div>
            </div>

            {/* Status Transition Toolbar */}
            <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-2">
              <span className="text-[11px] font-bold text-slate-700 block">
                Update Order Status:
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {(["pending", "processing", "shipped", "delivered", "cancelled"] as const).map(
                  (st) => {
                    const isCur = activeOrderModal.status === st;
                    return (
                      <button
                        key={st}
                        onClick={() => handleStatusChange(activeOrderModal.id, st)}
                        disabled={updatingId === activeOrderModal.id || isCur}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                          isCur
                            ? "bg-slate-900 text-white shadow-xs font-bold"
                            : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                        }`}
                      >
                        {st}
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <Button
                variant="secondary"
                size="sm"
                onClick={handlePrint}
                leftIcon={<Printer size={13} />}
              >
                Print Slip
              </Button>
              <Button variant="default" size="sm" onClick={() => setActiveOrderModal(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
