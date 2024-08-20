const db = require("../configs/db")


const getTransactions = async () => {

}

const getTransactionsByAccountId = async (id) => {
    try {
        const transactions = await db.transaction.findMany({
            where: {
                paymentAccountId: id
            }
        });

        console.log('Transactions:', transactions);

        return transactions;
    } catch (error) {
        console.error('Error fetching transactions:', error);
        throw error; 
    }
};


module.exports = {getTransactions, getTransactionsByAccountId}