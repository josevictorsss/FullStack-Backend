import { Request, Response } from "express";
import { MusicBusiness } from "../business/MusicBusiness";
import { GenreDatabase } from "../data/GenreDatabase";
import { MusicDatabase } from "../data/MusicDatabase";
import { MusicInputDTO } from "../model/Music";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

const musicBusiness = new MusicBusiness(
  new IdGenerator(),
  new Authenticator(),
  new MusicDatabase(),
  new GenreDatabase()
);

class MusicController {
  public addMusic = async (req: Request, res: Response): Promise<void> => {
    try {
      const token: string = req.headers.authorization as string;
      const { title, author, file, genres, album } = req.body;
      const input: MusicInputDTO = {
        title,
        author,
        file,
        genres,
        album,
      };
      const newMusic = await musicBusiness.addMusic(token, input);
      res.status(201).send({ Music: newMusic });
    } catch (error) {
      res.status(error.statusCode || 400).send({ message: error.message });
    }
  };

  public getMusicById = async (req: Request, res: Response): Promise<void> => {
    try {
      const token: string = req.headers.authorization as string;
      const { id } = req.params;
      const musicId = await musicBusiness.getMusicById(token, id);
      res.status(200).send(musicId);
    } catch (error) {
      res.status(error.statusCode || 400).send({ message: error.message });
    }
  };

  public getAllMusics = async (req: Request, res: Response): Promise<void> => {
    try {
      const token: string = req.headers.authorization as string;
      const musics = await musicBusiness.getAllMusics(token);
      res.status(200).send(musics);
    } catch (error) {
      res.status(error.statusCode || 400).send({ message: error.message });
    }
  };

  public getAllGenres = async (req: Request, res: Response): Promise<void> => {
    try {
      const genres = await musicBusiness.getAllGenres();
      res.status(200).send(genres);
    } catch (error) {
      res.status(error.statusCode || 400).send({ message: error.message });
    }
  };

  public deleteMusic = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const token: string = req.headers.authorization as string;
      await musicBusiness.deleteMusic(id, token);
      res.status(200);
    } catch (error) {
      res.status(error.statusCode || 400).send({ message: error.message });
    }
  };
}

export { MusicController };
