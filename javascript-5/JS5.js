/*   Fordyce, William (wfordyce28@gmail.com)
 *   @version 0.0.1
 *   @summary Code demonstration:  :: created:
 */

"use strict";
const PROMPT = require('readline-sync');
const IO = require('fs');

const COUPON_PRICE = 750, HAIRCUT_COST = 20, HAIRCUT_AND_WASH_COST = 25;
const HAIR_DYE_COST = 40, HAIR_STYLING_COST = 30;
let customerIdentification, customerNumber, continueResponse, initialBalanceSome;
let serviceMenu, newBalance, addOn, customerIdentificationPartTwo;

/**
 * @method
 * @desc The main method of the program
 * @returns {null}
 */
function main(){
    setContinueResponse();
    while (continueResponse === 1) {
        setCustomerIdentification();
        setCustomerIdentificationPartTwo();
        setCustomerNumber();
        displayWelcomeMessage();
        setInitialBalanceSome();
        displayInitialBalanceSome();
        setServiceMenu();
        setAddOn();
        setNewBalance();
        displayNewBalance();
        setCouponEligibility();
        setContinueResponse();
        displayEndMessage();
        loadCustomerDataFile();
        writeCustomerDataFile();
    }
}

main();

/**
 * @method
 * @desc Inputting customer name
 * @returns {null}
 */
function setCustomerIdentification(){
    customerIdentification = PROMPT.question(`\nPlease enter your name (Last, First): `);
}

/**
 * @method
 * @desc Inputting customer birth date
 * @returns {null}
 */
function setCustomerIdentificationPartTwo(){
    customerIdentificationPartTwo = Number(PROMPT.question(`\nPlease enter your birth date (mmddyy): `));
}

/**
 * @method
 * @desc calculating the customer's ID number
 * @returns {null}
 */
function setCustomerNumber(){
    customerNumber = customerIdentificationPartTwo / 2;
}

/**
 * @method
 * @desc Says hello to the customer
 * @returns {null}
 */
function displayWelcomeMessage(){
    console.log (`\nWelcome ${customerIdentification} your customer ID number is ${customerNumber}`);
}

/**
 * @method
 * @desc Inputting the previous balance of the customer's balance
 * @returns {null}
 */
function setInitialBalanceSome(){
    initialBalanceSome = Number(PROMPT.question(`\nWhat is your current balance? 
(If this is your first time using our online service please enter a zero):  `));
}

/**
 * @method
 * @desc Showing initial balance
 * @returns {null}
 */
function displayInitialBalanceSome(){
    console.log(`\n Your current balance is ${initialBalanceSome}`);
}

/**
 * @method
 * @desc Showing the services available
 * @returns {null}
 */
function setServiceMenu() {
    serviceMenu = -1;
    while (serviceMenu !== 1 && serviceMenu !== 2 && serviceMenu !== 3 && serviceMenu !== 4) {
        serviceMenu = Number(PROMPT.question(`\tPlease select the service you have received, 
        this will add to your balance and get you closer to receiving a coupon: 
           \t\t1) Haircut
           \t\t2) Haircut and Wash
           \t\t3) Hair dye
           \t\t4) Hair styling
           \t\tPlease enter the number of the service you've received: `
        ));
    }
}

/**
 * @method
 * @desc Adding the cost of the service to the balance
 * @returns {null}
 */
function setAddOn(){
    if (serviceMenu === 1){
        addOn = HAIRCUT_COST;
    }
    else if (serviceMenu === 2){
        addOn = HAIRCUT_AND_WASH_COST;
    }
    else if (serviceMenu === 3){
        addOn = HAIR_DYE_COST;
    }
    else if (serviceMenu === 4){
        addOn = HAIR_STYLING_COST;
    }
}

/**
 * @method
 * @desc Adding initial balance to service price
 * @returns {null}
 */
function setNewBalance(){
    newBalance = Number(initialBalanceSome + addOn);
}

/**
 * @method
 * @desc Showing new balance
 * @returns {null}
 */
function displayNewBalance(){
    console.log(`\nYour new total balance is ${newBalance}`);
}

/**
 * @method
 * @desc Showing coupon is customer is eligible
 * @returns {null}
 */
function setCouponEligibility() {
    if (newBalance >= COUPON_PRICE){
        console.log(`\nCongratulations! You have provided us with enough business to warrant you this coupon!
    |-----------------------------------------------------------------------------------------------------|
    |                                                                                                     |
    |                                       ONE FREE HAIRCUT                                              |
    |                                                                                                     |
    |                                                                                                     |
    |      TELL THE CASHIER YOUR CUSTOMER ID NUMBER DURING YOUR NEXT VISIT TO RECEIVE YOUR REWARD         |
    |                                                                                                     |
    |-----------------------------------------------------------------------------------------------------|`);
    }

}

/**
 * @method
 * @desc Asking the customer if they want to continue
 * @returns {null}
 */
function setContinueResponse() {
    if (continueResponse === 1 || continueResponse === 0) {
        continueResponse = Number(PROMPT.question(`\nDo you want to continue? [0=no, 1=yes]: `));
        while (continueResponse !== 0 && continueResponse !== 1) {
            console.log(`${continueResponse} is an incorrect value. Please try again.`);
            continueResponse = Number(PROMPT.question(`\nDo you want to continue? [0=no, 1=yes]: `));
        }
    } else {
        continueResponse = 1;
    }
}

/**
 * @method
 * @desc aying goodbye to the customer
 * @returns {null}
 */
function displayEndMessage() {
    console.log(`\nThanks for using our online service, have a nice day!`)
}

/**
 * @method
 * @desc loading customer data
 * @returns {null}
 */
function loadCustomerDataFile() {
    let customersFile = IO.readFileSync(`Customer Files/CUSTOMER-DATA.csv`, 'utf8');
    let lines = customersFile.toString().split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
        customerNumber.push(lines[i].toString().split(/,/));
    }
}

/**
 * @method
 * @desc Writing the customer data to the csv file
 * @returns {null}
 */
function writeCustomerDataFile() {
    const COLUMNS = 4;
    for (let i = 0; i < customerNumber.length; i++){
        if (customerNumber[i]) {
            for (let j = 0; j < COLUMNS; j++) {
                if (j < COLUMNS - 1) {
                    IO.appendFileSync(`Customer Files/Customer FilesX.csv`, `${customerNumber[i][j]},`);
                } else if (i < customerNumber.length - 1) {
                    IO.appendFileSync(`Customer Files/Customer FilesX.csv`, `${customerNumber[i][j]}\n`);
                } else {
                    IO.appendFileSync(`Customer Files/Customer FilesX.csv`, `${customerNumber[i][j]}`);
                }
            }
        }
    }
    IO.unlinkSync(`Customer Files/CUSTOMER-DATA.csv`);
    IO.renameSync(`Customer Files/Customer FilesX.csv`, `Customer Files/CUSTOMER-DATA.csv`);
}
