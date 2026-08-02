import fs from "fs";
import path from "path";

import Vector from "../models/Vector.js";
import { createEmbedding } from "../services/embed.js";

const files = ["about.txt", "skills.txt", "experience.txt", "projects.txt"];

for (const file of files) {
  const text = fs.readFileSync(path.join("./data", file), "utf8");

  const embedding = await createEmbedding(text);

  await Vector.create({
    source: file,
    text,
    embedding,
  });

  console.log(file + " imported");
}
