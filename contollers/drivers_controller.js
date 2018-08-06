const Driver = require('../models/driver');

module.exports = {
  greeting(req, res) {
    res.send({ hi: 'there' });
  },

  // index(req, res, next) {
  //   res.send({ hi: 'there' });
  // },
  index(req, res, next) {
    const { lng, lat } = req.query;

    // @deprecated function geoNear
    // Driver.geoNear(
    //   { type: 'Point', coordinates: [lng, lat] },
    //   { spherical: true, maxDistance: 200000 }
    // )
    //   .then(drivers => res.send(drivers))
    //   .catch(next);
    
    Driver.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
          spherical: true,
          distanceField: "dist.calculated",
          maxDistance: 200000
        }
      }
    ])
      .then(drivers => res.send(drivers))
      .catch(next);
  },

  create(req, res, next) {
    const driverProps = req.body;

    Driver.create(driverProps)
      .then(driver => res.send(driver))
      .catch(next);
  },

  edit(req, res, next) {
    const driverId = req.params.id;
    const driverProps = req.body;

    Driver.findByIdAndUpdate(driverId, driverProps)
      .then(() => Driver.findById(driverId))
      .then(driver => res.send(driver))
      .catch(next);
  },

  delete(req, res, next) {
    const driverId = req.params.id;
    
    Driver.findByIdAndRemove(driverId)
      .then(driver => res.status(204).send(driver))
      .catch(next);
  }
};