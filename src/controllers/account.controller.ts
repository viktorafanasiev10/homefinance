import Account from '../models/account';

class AccountController {
  // Get all accounts for a user
  public async getAll(req: any, res: any) {
    const userId = req.user.id; // Assuming you have user info in req.user

    try {
      const accounts = await Account.findAll({ where: { userId } });
      res.json(accounts);
    } catch (err) {
      res.status(500).json({ message: 'Error while fetching accounts' });
    }
  }

  // Create a new account
  public async create(req: any, res: any) {
    const userId = req.user.id; // Assuming you have user info in req.user
    const { name, initialBalance, currentBalance, currency } = req.body;

    try {
      const account = await Account.create({ userId, name, initialBalance, currentBalance, currency });
      res.json(account);
    } catch (err) {
      res.status(500).json({ message: 'Error while creating account' });
    }
  }

  // Update an account
  public async update(req: any, res: any) {
    const userId = req.user.id; // Assuming you have user info in req.user
    const { accountId } = req.params;
    const { name, initialBalance, currentBalance, currency } = req.body;

    try {
      const account = await Account.findOne({ where: { id: accountId, userId } });
      if (!account) {
        return res.status(404).json({ message: 'Account not found' });
      }

      account.name = name;
      account.initialBalance = initialBalance;
      account.currentBalance = currentBalance;
      account.currency = currency;
      await account.save();

      res.json(account);
    } catch (err) {
      res.status(500).json({ message: 'Error while updating account' });
    }
  }

  // Delete an account
  public async delete(req: any, res: any) {
    const userId = req.user.id; // Assuming you have user info in req.user
    const { accountId } = req.params;

    try {
      const account = await Account.findOne({ where: { id: accountId, userId } });
      if (!account) {
        return res.status(404).json({ message: 'Account not found' });
      }

      await account.destroy();
      res.json({ message: 'Account deleted' });
    } catch (err) {
      res.status(500).json({ message: 'Error while deleting account' });
    }
  }
}

export const accountController = new AccountController();
