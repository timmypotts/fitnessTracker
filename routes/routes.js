const router = require("express").Router();
const path = require("path");
const Workout = require("../models/workout");
const db = require("../models");

router.post("/api/workouts", (req, res) => {
  db.Workout.create({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const newWorkout = { id, body };

  Workout.findByIdAndUpdate(
    id,
    { $push: { exercises: body } },
    (err, updatedWorkout) => {
      if (err) {
        res.json({
          newWorkout,
          success: false,
          msg: "Could not update workout"
        });
      } else {
        res.json({
          newWorkout,
          success: true,
          msg: "New workout added"
        });
      }
    }
  );
});

router.get("/api/workouts", (req, res) => {
  Workout.find({})
    .sort({ date: -1 })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  Workout.find({})
    .sort({ date: -1 })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts/:id", (req, res) => {
  console.log(req.params.id);
  console.log(req);
  Workout.findById(req.params.id)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

router.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/stats.html"));
});

module.exports = router;
