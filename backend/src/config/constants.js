module.exports = {
  OPERATION_TYPES: {
    RECEIPT: 'RECEIPT',
    DELIVERY: 'DELIVERY',
    TRANSFER: 'TRANSFER',
    ADJUSTMENT: 'ADJUSTMENT',
  },
  STATUS: {
    DRAFT: 'draft',
    WAITING: 'waiting',
    READY: 'ready',
    DONE: 'done',
    CANCELED: 'canceled',
  },
  MOVEMENT_TYPES: {
    IN: 'IN',
    OUT: 'OUT',
    TRANSFER_IN: 'TRANSFER_IN',
    TRANSFER_OUT: 'TRANSFER_OUT',
    ADJUSTMENT: 'ADJUSTMENT',
  },
  LOW_STOCK_THRESHOLD_DEFAULT: 10,
};
