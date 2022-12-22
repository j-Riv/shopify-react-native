export interface ICart {
  cart: {
    id: string;
    createdAt: string;
    updatedAt: string;
    lines: {
      edges: any[];
    };
    attributes: any[];
    cost: {
      totalAmount: {
        amount: string;
        currencyCode: 'USD';
      };
      subtotalAmount: {
        amount: string;
        currencyCode: 'USD';
      };
      totalTaxAmount: null | string;
      totalDutyAmount: null | string;
    };
  };
  addingToCart: boolean;
  addProductToCart: (gid: string) => Promise<void>;
  updateProductInCart: (
    id: string,
    merchandiseid: string,
    quantity: number
  ) => Promise<void>;
  removeProductFromCart: (lineId: string) => Promise<void>;
  getNewCart: () => Promise<any>;
}
