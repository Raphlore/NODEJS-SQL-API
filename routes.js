const express = require('express')
const employeeTable = require('./models').employee

const router = express.Router()

// Add employees API (POST)
router.post('/add-employee', (req, res) => {
  // Making the email unique
  employeeTable.findOne({
    where: {
      email: req.body.email
    }
  }).then(( data ) => {
    if(data) {
      res.json({
        status: false,
        message: 'Email already exists'
      })
    } else {
      employeeTable.create({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        mobile: req.body.mobile
      }).then(( success ) => {
        res.json({
          status: true,
          message: 'Employees created successfully'
        })
      }).catch(( error ) => {
        res.json({
          status: false,
          message: 'failed to execute insert query'
        })
      })
    }
  }).catch(( error ) => {
    res.json({
      status: false,
      message: 'Failed to execute query'
    })
  })

})

// Get all employees (GET)
router.get('/list-employee', (req, res) => {
  employeeTable.findAll()
  .then(( data ) => {
    if (data) {
      res.json({
        status: true,
        message: 'Employees found',
        user: data
      })
    }else {
      res.json({
        status: false,
        message: 'No employee found'
      })
    }
  }).catch ((error) => {
    res.json({
      status: false,
      message: 'Failed to execute query'
    })
  })
})

// Get a single employees information(GET)
router.get('/single-employee/:id', (req, res) => {
  employeeTable.findOne({
    where: {
      id: req.params.id
    }
  }).then(( data ) => {
     if (data) {
      res.json({
        status: true,
        message: 'Employee data found',
        user: data
      })
     } else{
      res.json({
        status: false,
        message: 'No employees found'
      })
     }
  }).catch((error) => {
    res.json({
      status: false,
      message: 'Failed to execute query'
    })
  })
})

// Update employees API(PUT)
router.put('/update-employee/:id', (req, res) => {
  employeeTable.findOne({
    where: {
      id: req.params.id
    }
  }).then(( data ) => {
    if(data) {
      employeeTable.update({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile
      }, {
        where: {
          id: req.params.id
        }
      }).then(( data ) => {
        res.json({
          status: true,
          message: 'Employees updated successfully'
        })
      }).catch((error) => {
        res.json({
          status: false,
          message: 'Failed to execute query'
        })
      })
    }else {
      res.json({
        status: false,
        message: 'No employee found'
      })
    }
  }).catch((error) => {
    res.json({
      status: false,
      message: 'Failed to execute query'
    })
  })
})


// Delete employees API(DELETE)
router.delete('/delete-employee/:id', (req, res) => {
  employeeTable.findOne({
    where: {
      id: req.params.id
    }
  }).then((data) => {
     if(data) {
      employeeTable.destroy({
        where: {
          id: req.params.id
        }
      }).then((data) => {
        res.json({
          status: true,
          message: 'Employee deleted successfully'
        })
      }).catch((error) => {
        res.json({
          status: false,
          message: 'Failed to execute query'
        })
      })
     }else {
      res.json({
        status: false,
        message: 'No employees found'
      })
     }
  }).catch((error) => {
    res.json({
      status: false,
      message: 'Failed to execute query'
    })
  })
})
//Welcome page
router.get('/', (req, res) => {
res.json({
  status: true,
  message: 'Welcome to main landing page'
})

})


module.exports = router;