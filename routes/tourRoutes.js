const express = require('express');
const tourController = require('../controllers/tourControllers');

const router = express.Router();


// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTours);
// app.put('/api/v1/tours/:id', createOrUpdateTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);
// app.get('/api/v1/tours/:id', getTour);

router.param('id', tourController.checkID);

router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.createTours);

router
    .route('/:id')
    .put(tourController.createOrUpdateTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour)
    .get(tourController.getTour);

module.exports = router;