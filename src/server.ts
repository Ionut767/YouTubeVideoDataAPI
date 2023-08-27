import express, { Request, Response, Application, NextFunction } from "express";
import cors from "cors";
import yts from "yt-search";
import bodyParser from "body-parser";
const app: Application = express();

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    data: "Hi! To use this API, please check the docs on github! https://github.com/Ionut767/YouTubeVideoDataAPI",
  });
});
app.get("/:videoTitle", async (req: Request, res: Response) => {
  const searchResults = yts(req.params.videoTitle);
  if (searchResults && (await searchResults).videos.length < 0) {
    res.status(404).json({ data: "The video was not found!" });
  } else {
    res.status(200).json({ data: (await searchResults).videos[0] });
  }
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: "Internal server error" });
});

app.listen(5000, () => {
  console.log("Server running!");
});
