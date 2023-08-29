import express, { Request, Response, Application, NextFunction } from "express";
import cors from "cors";
import yts from "yt-search";
import bodyParser from "body-parser";
import { selectedDataInterface } from "./interfaces/Interface";
import parseUrl from "url-parse";
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
app.get("/:videoInput", async (req: Request, res: Response) => {
  const decodedUrl = decodeURIComponent(req.params.videoInput);

  const searchResults = await yts.search(decodedUrl);

  const attributes: string[] | undefined = req.query.attributes
    ?.toString()
    .split(",");
  if (searchResults && searchResults.videos.length === 0) {
    return res.status(404).json({ error: "The video was not found!" });
  } else {
    const data: selectedDataInterface = {};
    if (attributes?.includes("all") || !attributes) {
      return res.status(200).json({ data: searchResults.videos[0] });
    }
    attributes.forEach((attribute) => {
      if (
        attributes?.includes(attribute) &&
        attribute in searchResults.videos[0]
      ) {
        data[attribute as keyof selectedDataInterface] = (
          searchResults.videos[0] as any
        )[attribute as keyof (typeof searchResults.videos)[0]];
      }
    });
    if (Object.keys(data).length > 0) {
      return res.status(200).json({ data });
    } else {
      return res.status(404).json({ error: "No data was found!" });
    }
  }
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ error: "Internal server error" });
});

app.listen(5000, () => {
  console.log("Server running!");
});
