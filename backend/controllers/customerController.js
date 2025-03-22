const Customer = require('../models/customerModel');

// @desc    Get all customers
// @route   GET /api/customers
// @access  Private
const getCustomers = async (req, res) => {
  const customers = await Customer.find({});
  res.json(customers);
};

// @desc    Get high risk customers
// @route   GET /api/customers/high-risk
// @access  Private
const getHighRiskCustomers = async (req, res) => {
  const customers = await Customer.find({ churnRisk: { $gt: 65 } }).sort({
    churnRisk: -1,
  });
  res.json(customers);
};

// @desc    Create a customer
// @route   POST /api/customers
// @access  Private
const createCustomer = async (req, res) => {
  const customer = new Customer(req.body);
  const createdCustomer = await customer.save();
  res.status(201).json(createdCustomer);
};

// @desc    Record an intervention
// @route   POST /api/customers/:id/intervention
// @access  Private
const recordIntervention = async (req, res) => {
  const { type } = req.body;
  const customer = await Customer.findById(req.params.id);

  if (customer) {
    customer.interventions.push({
      type,
      date: new Date(),
      successful: false,
    });
    
    const updatedCustomer = await customer.save();
    res.json(updatedCustomer);
  } else {
    res.status(404);
    throw new Error('Customer not found');
  }
};

module.exports = {
  getCustomers,
  getHighRiskCustomers,
  createCustomer,
  recordIntervention,
};