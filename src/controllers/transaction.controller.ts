import { sequelize } from '../config/database.js';
import { Transaction, Account } from '../models';

class TransactionController {
  public async getAll(req: any, res: any) {
    const userId = req.user.id;
    const accountId = req.params.accountId;

    try {
      const transactions = await Transaction.findAll({ where: { accountId, userId } });
      res.json(transactions);
    } catch (err) {
      res.status(500).json({ message: 'Error while fetching transactions' });
    }
  }

  public async createTransfer(req: any, res: any) {
    const userId = req.user.id;
    const { fromAccountId, toAccountId, amount, date, description, exchangeRate, foreignCurrencyAmount } = req.body;

    const transaction = await sequelize.transaction();

    try {
      const fromTransaction = await Transaction.create({ accountId: fromAccountId, userId, subcategoryId: null, amount, date, description, exchangeRate, foreignCurrencyAmount, type: 'Transfer' }, { transaction });
      const toTransaction = await Transaction.create({ accountId: toAccountId, userId, subcategoryId: null, amount, date, description, exchangeRate, foreignCurrencyAmount, type: 'Transfer' }, { transaction });

      await transaction.commit();

      res.json({ fromTransaction, toTransaction });
    } catch (err) {
      await transaction.rollback();
      res.status(500).json({ message: 'Error while creating transaction' });
    }
  }

  public async createIncome(req: any, res: any) {
    const userId = req.user.id;
    const accountId = req.params.accountId;
    const { subcategoryId, amount, date, description, exchangeRate, foreignCurrencyAmount } = req.body;

    const transaction = await sequelize.transaction();

    try {
      const account = await Account.findOne({ where: { id: accountId, userId } });
      if (!account) {
        await transaction.rollback();
        return res.status(404).json({ message: 'Account not found' });
      }

      account.currentBalance += amount;
      await account.save({ transaction });

      const newTransaction = await Transaction.create({ accountId, userId, subcategoryId, amount, date, description, exchangeRate, foreignCurrencyAmount, type: 'Income' }, { transaction });

      await transaction.commit();

      res.json(newTransaction);
    } catch (err) {
      await transaction.rollback();
      res.status(500).json({ message: 'Error while creating transaction' });
    }
  }

  public async create(req: any, res: any) {
    const userId = req.user.id;
    const accountId = req.params.accountId;
    const { subcategoryId, amount, date, description, exchangeRate, foreignCurrencyAmount, type } = req.body;

    try {
      const transaction = await Transaction.create({ accountId, userId, subcategoryId, amount, date, description, exchangeRate, foreignCurrencyAmount, type });
      res.json(transaction);
    } catch (err) {
      res.status(500).json({ message: 'Error while creating transaction' });
    }
  }

  public async update(req: any, res: any) {
    const userId = req.user.id;
    const accountId = req.params.accountId;
    const { transactionId } = req.params;
    const { subcategoryId, amount, date, description, exchangeRate, foreignCurrencyAmount, type } = req.body;

    try {
      const transaction = await Transaction.findOne({ where: { id: transactionId, accountId, userId } });
      if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }

      transaction.subcategoryId = subcategoryId;
      transaction.amount = amount;
      transaction.date = date;
      transaction.description = description;
      transaction.exchangeRate = exchangeRate;
      transaction.foreignCurrencyAmount = foreignCurrencyAmount;
      transaction.type = type;
      await transaction.save();

      res.json(transaction);
    } catch (err) {
      res.status(500).json({ message: 'Error while updating transaction' });
    }
  }

  public async delete(req: any, res: any) {
    const userId = req.user.id;
    const accountId = req.params.accountId;
    const { transactionId } = req.params;

    try {
      const transaction = await Transaction.findOne({ where: { id: transactionId, accountId, userId } });
      if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }

      await transaction.destroy();
      res.json({ message: 'Transaction deleted' });
    } catch (err) {
      res.status(500).json({ message: 'Error while deleting transaction' });
    }
  }
}

export const transactionController = new TransactionController();
