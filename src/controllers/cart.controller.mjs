import DaoFactory from '../dao/daoFactory.js';
import CartDto from '../dto/cartDto.js';

const cartDao = DaoFactory.createDao('cart');

const cartController = {
  createCart: async (req, res) => {
    try {
      const newCart = await cartDao.createCart(req.userId);
      const cartDto = new CartDto(newCart);
      res.status(201).json(cartDto);
    } catch (error) {
      res.status(500).json({ error: 'Unable to create cart' });
    }
  },

  getCart: async (req, res) => {
    const userId = req.userId;

    try {
      const cart = await cartDao.getCart(userId);
      if (!cart) {
        res.status(404).json({ error: 'Cart not found' });
      } else {
        const cartDto = new CartDto(cart);
        res.json(cartDto);
      }
    } catch (error) {
      res.status(500).json({ error: 'Unable to get cart' });
    }
  },

  addItemToCart: async (req, res) => {
    const userId = req.userId;
    const productId = req.params.pid;
    const quantity = req.body.quantity;

    try {
      const cart = await cartDao.addItemToCart(userId, productId, quantity);
      const cartDto = new CartDto(cart);
      res.status(200).json(cartDto);
    } catch (error) {
      res.status(500).json({ error: 'Unable to add item to cart' });
    }
  },

  removeItemFromCart: async (req, res) => {
    const userId = req.userId;
    const productId = req.params.pid;

    try {
      const cart = await cartDao.removeItemFromCart(userId, productId);
      const cartDto = new CartDto(cart);
      res.status(200).json(cartDto);
    } catch (error) {
      res.status(500).json({ error: 'Unable to remove item from cart' });
    }
  },

  clearCart: async (req, res) => {
    const userId = req.userId;

    try {
      const cart = await cartDao.clearCart(userId);
      const cartDto = new CartDto(cart);
      res.status(200).json(cartDto);
    } catch (error) {
      res.status(500).json({ error: 'Unable to clear cart' });
    }
  },
};

export default cartController;
