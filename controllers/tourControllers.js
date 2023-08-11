const fs = require('fs');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

// 2). ROUTE HANDLERS
exports.getAllTours = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours: tours
        },
        time: req.requestTime
    });
};

exports.createTours = (req, res) => {
    const newID = tours[tours.length -1].id +1;
    const newTour = Object.assign({ id: newID}, req.body);

    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });
    });
}

exports.createOrUpdateTour = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);
    const updateTour = Object.assign({ id: id}, req.body);
    // // if(id > tours.length) {
    if(!tour) {
        tours.push(updateTour);
        fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours), err => {
            return res.status(201).json({
                status: 'success',
                data: {
                    tour: updateTour
                },
                message: 'Created'
            });
        });    
    }

    const index = tours.indexOf(tour);
    if(index > -1) {
        tours[index] = updateTour;
        fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours), err => {
            res.status(200).json({
                status: 'success',
                data: {
                    tour: updateTour
                },
                message: 'Updated ID'
            });
        });
    }
}

exports.updateTour = (req, res) => {
    // console.log(req.body);
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);

    // if(id > tours.length) {
    if(!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Bad Request, Invalid id number'
        });  
    }

    const patchTour = Object.assign({ id: id}, req.body);

    const index = tours.indexOf(tour);
    if(index > -1) {
        tours[index] = patchTour;
        fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours), err => {
            res.status(200).json({
                status: 'success',
                data: {
                    tour: patchTour
                },
                message: "Updated ID"
            });
        });
    }
}

exports.deleteTour = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);

    // if(id > tours.length) {
    if(!tour) {
        return res.status(400).json({
            status: 'fail',
            message: 'Bad Request, Invalid id number'
        });
    }

    const index = tours.indexOf(tour);
    console.log(index);

    if (index > -1) { // only splice array when item is found
        tours.splice(index, 1); // 2nd parameter means remove one item only
        fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours), err => {
            res.status(200).json({
                status: 'success',
                // data: null,
                message: 'Deleted ID'
            });
        });
    }
}

exports. getTour = (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;

    const tour = tours.find(el => el.id === id);

    // if(id > tours.length) {
    if(!tour) {
        return res.status(400).json({
            status: 'fail',
            // results: tour.length,
            message: 'Bad Request, Not available tour id number ${id}'
        });  
    }
    
    res.status(200).json({
        status: 'success',
        // results: tour.length,
        data: {
            tours: tour
        }
    });
}