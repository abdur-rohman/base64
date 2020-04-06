var express = require("express");
var router = express.Router();
const { promises } = require("fs");

/* GET users listing. */
router.get("/", (req, res) => {
  res.send("respond with a resource");
});

router.post("/uploads", async (req, res) => {
  const base64 = req.body.image;

  const image = Buffer.from(base64, "base64");

  await promises.writeFile(`uploads/${new Date().getTime()}.png`, image);

  res.set({
    "Content-Type": "image/png",
    "Content-Length": image.length,
  });

  res.send(image);
});

router.get("/images/:id", async (req, res) => {
  const path = req.params.id;

  const base64 = await promises.readFile(`uploads/${path}`);

  res.set({
    "Content-Type": "image/png",
    "Content-Length": base64.length,
  });

  res.send(base64);
});

(async () => {
  console.log(
    await promises.readFile("assets/download.png", {
      encoding: "base64",
    })
  );
})();

module.exports = router;
