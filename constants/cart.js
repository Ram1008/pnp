export const defaultPrintSettings = {
  colorMode: 'Black & White',
  printSide: 'Single Sided',
  paperSize: 'A4',
  paperType: 'Plain Paper',
  binding: 'None',
  orientation: 'Portrait',
  copies: 1,
  pagesPerSheet: 1,
};

export const dummyCartData = {
  files: [
    {
      id: 'f1',
      name: 'Project Report.pdf',
      pages: 24,
      price: 48,
      type: 'file',
      printSettings: {
        ...defaultPrintSettings,
        price: {
          perPage: 2,
          binding: 10,
          total: 48
        }
      }
    },
    {
      id: 'f2',
      name: 'Wedding Invitation.docx',
      pages: 2,
      price: 10,
      type: 'file',
      printSettings: {
        ...defaultPrintSettings,
        price: {
          perPage: 2,
          binding: 10,
          total: 48
        }
      }
    },
    {
      id: 'f3',
      name: 'Resume Template.pdf',
      pages: 3,
      price: 15,
      type: 'file',
      printSettings: {
        ...defaultPrintSettings,
        price: {
          perPage: 2,
          binding: 10,
          total: 48
        }
      }
    }
  ],
  products: [
    {
      id: 'p1',
      name: 'Premium Photo Paper A4',
      price: 299,
      quantity: 2,
      imageUrl: '/images/products/photo-paper.jpg',
      type: 'product'
    },
    {
      id: 'p2',
      name: 'Spiral Binding (80 pages)',
      price: 149,
      quantity: 1,
      imageUrl: '/images/products/spiral-binding.jpg',
      type: 'product'
    },
    {
      id: 'p3',
      name: 'Business Cards Pack of 100',
      price: 399,
      quantity: 1,
      imageUrl: '/images/products/business-cards.jpg',
      type: 'product'
    }
  ],
  totalItems: 6,
  totalAmount: 1219 // (48 + 10 + 15) + (299*2 + 149 + 399)
};

export const printOptions = {
  colorMode: ['Black & White', 'Color'],
  printSide: ['Single Sided', 'Double Sided'],
  paperSize: ['A4', 'A3', 'Legal', 'Letter'],
  paperType: ['Plain Paper', 'Bond Paper', 'Photo Paper'],
  binding: ['None', 'Staple', 'Spiral', 'Hard Cover'],
  orientation: ['Portrait', 'Landscape'],
};
