// CREATE A NEW EXPRESS ROUTE
const router = require("express").Router();

const { Router } = require("express");
//IMPORT OUR MODEL
const Bird = require("../models/Bird");

// SEED DATA FOR SEED ROUTE
const birdSeed = [
  {
    name: "Ruby-throated Hummingbird",
    img: "https://www.allaboutbirds.org/guide/assets/photo/60395561-480px.jpg",
    description:
      "The ruby-throated hummingbird is a species of hummingbird that generally spends the winter in Central America, Mexico, and Florida, and migrates to Canada and other parts of Eastern North America for the summer to breed. It is by far the most common hummingbird seen east of the Mississippi River in North America.",
  },
  {
    name: "Yellow Warbler",
    img: "https://www.allaboutbirds.org/guide/assets/photo/64802921-480px.jpg",
    description:
      "North America has more than 50 species of warblers, but few combine brilliant color and easy viewing quite like the Yellow Warbler. In summer, the buttery yellow males sing their sweet whistled song from willows, wet thickets, and roadsides across almost all of North America. The females and immatures aren’t as bright, and lack the male’s rich chestnut streaking, but their overall warm yellow tones, unmarked faces, and prominent black eyes help pick them out.",
  },
  {
    name: "Barred Owl",
    img: "https://www.allaboutbirds.org/guide/assets/photo/60394861-480px.jpg",
    description:
      "The Barred Owl’s hooting call, “Who cooks for you? Who cooks for you-all?” is a classic sound of old forests and treed swamps. But this attractive owl, with soulful brown eyes and brown-and-white-striped plumage, can also pass completely unnoticed as it flies noiselessly through the dense canopy or snoozes on a tree limb. Originally a bird of the east, during the twentieth century it spread through the Pacific Northwest and southward into California.",
  },
];

// ROUTES (async, since database actions are asynchronous)

// index route (GET)
router.get("/", async (Req, res) => {
  try {
    // query database for all the birds
    const birds = await Bird.find({});
    // send birds as JSON
    res.json(birds);
  } catch (error) {
    // return error as JSON with an error status
    res.status(400).json(error);
  }
});

// create (POST) route
router.post("/", async (req, res) => {
  try {
    // pass the request body to create a new place in the database
    const newBird = await Bird.create(req.body);
    // send newly created place back as JSON
    res.json(newBird);
  } catch (error) {
    // return error as JSON with an error status
    res.status(400).json(error);
  }
});

// update (PUT) route
// update Route
router.put("/:id", async (req, res) => {
  try {
    // pass the request body to update and existing place in the database
    const updatedBird= await Bird.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    // send newly updated place back as JSON
    res.json(updatedBird);
  } catch (error) {
    // return error as JSON with an error status
    res.status(400).json(error);
  }
});

// DELETE route
router.delete("/:id", async (req, res) => {
  try {
    // delete existing place in the database
    const deletedBird = await Bird.findByIdAndRemove(req.params.id);
    // send delete place back as JSON
    res.json(deletedBird);
  } catch (error) {
    // return error as JSON with an error status
    res.status(400).json(error);
  }
});

// Seed Route for Seeding Database
router.get("/seed", async (req, res) => {
  // try block for catching errors
  try {
    // remove all places from database
    await Bird.remove({});
    // add the seed data to the database
    await Bird.create(birdSeed);
    // get full list of places to confirm seeding worked
    const birds = await Bird.find({});
    // return full list of places as JSON
    res.json(birds);
  } catch (error) {
    // return error as JSON with an error status
    res.status(400).json(error);
  }
});

//test routes

// index route (GET)
router.get("/", async (req, res) => {
    try {
        const birds = await Bird.find({})
        res.json(birds)
    } catch (error) {
        res.status(400).json(error)
    }
})

//create (POST)
router.post("/", async (req, res) => {
    try {
        const newBird = await Bird.create(req.body)
        res.json(newBird)
    } catch (error) {
        res.status(400).json(error)
    }
})

//update (PUT)
router.put("/:id", async (req, res) => {
    try {
        const updatedBird = await Bird.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        )
        res.json(updatedBird)
    } catch (error) {
        res.status(400).json(error)
    }
})


//(DELETE)
router.delete("/:id", async (req, res) => {
    try {
        const deletedBird = await Bird.findByIdAndRemove(req.params.id)
        res.json(deletedBird)
    } catch (error) {
        res.status(400).json(error)
    }
})



// export the router which has all our routes registered to it
module.exports = router;
