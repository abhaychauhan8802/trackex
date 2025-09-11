const incomeCategories: { [key: string]: { icon: any } } = {
  salary: {
    icon: require("../assets/icons/salary.png"),
  },
  coupons: {
    icon: require("../assets/icons/coupon.png"),
  },
  "sold items": {
    icon: require("../assets/icons/cart.png"),
  },
  gift: {
    icon: require("../assets/icons/gift.png"),
  },
  "other income": {
    icon: require("../assets/icons/other.png"),
  },
};

const expenseCategories: { [key: string]: { icon: any } } = {
  "other expenses": {
    icon: require("../assets/icons/other.png"),
  },
  food: {
    icon: require("../assets/icons/food.png"),
  },
  shopping: {
    icon: require("../assets/icons/bag.png"),
  },
  travelling: {
    icon: require("../assets/icons/traveling.png"),
  },
  entertainment: {
    icon: require("../assets/icons/entertainment.png"),
  },
  medical: {
    icon: require("../assets/icons/health.png"),
  },
  education: {
    icon: require("../assets/icons/education.png"),
  },
  bills: {
    icon: require("../assets/icons/bill.png"),
  },
  investments: {
    icon: require("../assets/icons/investments.png"),
  },
  rent: {
    icon: require("../assets/icons/rent.png"),
  },
  taxes: {
    icon: require("../assets/icons/taxes.png"),
  },
  insurance: {
    icon: require("../assets/icons/insurance.png"),
  },
  gift: {
    icon: require("../assets/icons/gift.png"),
  },
  donation: {
    icon: require("../assets/icons/donation.png"),
  },
};

export { expenseCategories, incomeCategories };
