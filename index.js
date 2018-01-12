

// console.log(stocks);
const login = require('./rh-actions/login');
// const initCrons = require('./app-actions/init-crons');
const initStrategies = require('./app-actions/init-strategies');

const getAllTickers = require('./rh-actions/get-all-tickers');
const cancelAllOrders = require('./rh-actions/cancel-all-orders');
// const logPortfolioValue = require('./app-actions/log-portfolio-value');

let Robinhood, allTickers;

// const rh = require('./shared-async/rh');

(async () => {

    Robinhood = await login();

    // await rh.init();
    // Robinhood = rh();

    // does the list of stocks need updating?
    try {
        allTickers = require('./stock-data/allStocks');
    } catch (e) {
        allTickers = await getAllTickers(Robinhood);
    }
    allTickers = allTickers
        .filter(stock => stock.tradeable)
        .map(stock => stock.symbol);

    await cancelAllOrders(Robinhood);

    // await logPortfolioValue(Robinhood);

    await initStrategies(Robinhood);

    // startCrons();

})();
