const { test, expect } = require('@playwright/test');
const CustomerPage = require('../pages/customerPage');
const AdminPage = require('../pages/adminPage');
const config = require('../utils/config');

test('Validate data between Customer and Admin apps', async ({ browser }) => {

  // Create 2 independent contexts (like 2 users)
  const customerContext = await browser.newContext();
  const adminContext = await browser.newContext();

  const customerPageObj = await customerContext.newPage();
  const adminPageObj = await adminContext.newPage();

  // Initialize POM classes
  const customerPage = new CustomerPage(customerPageObj);
  const adminPage = new AdminPage(adminPageObj);

  // Open applications
  await customerPageObj.goto(config.customerURL);
  await adminPageObj.goto(config.adminURL);

  // Step 1: Get data from customer app
  const customerName = await customerPage.getCustomerName();

  // Step 2: Validate in admin app
  const adminName = await adminPage.searchCustomer(customerName);

  // Assertion
  expect(customerName).toBe(adminName);

});