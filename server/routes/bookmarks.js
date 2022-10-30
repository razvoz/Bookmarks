import { Router } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from 'sqlite3';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sqlite = sqlite3.verbose();
let sql;

const db = new sqlite.Database(
  `${__dirname}/../db/data.db`,
  sqlite.OPEN_READWRITE, (error) => {
    if (error) return console.log(error);
  }
);
const router = Router();

router.get('/', (req, res) => {
  sql = 'SELECT * FROM Bookmarks';

  try {
    db.all(sql, [], (error, rows) => {
      if (error) {
        return res.json({
          status: 500,
          success: false,
          error: 'Ошибка получения списка закладок'
        });
      }

      return res.json({
        status: 200,
        data: rows,
        success: true
      });
    });
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
      error: 'Ошибка выполнения базы данных'
    });
  }
});

router.get('/tags', (req, res) => {
  sql = 'SELECT Tags FROM Bookmarks';

  try {
    db.all(sql, [], (error, rows) => {
      if (error) {
        return res.json({
          status: 500,
          success: false,
          error: 'Ошибка получения списка тегов'
        });
      }

      let tagsString = '';
      const filteredRows = rows.filter((el) => el.Tags !== null);

      filteredRows.forEach((elem) => tagsString += `${elem.Tags};`);
      
      const tagsArray = tagsString.split(';');
      const tagsSet = new Set(tagsArray.map((item) => item));
      const resultTagsArray = Array.from(tagsSet).filter(el => el !== '');      

      return res.json({
        status: 200,
        data: resultTagsArray,
        success: true
      });
    });
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
      error: 'Ошибка выполнения базы данных'
    });
  }
});

router.post('/add', (req, res) => {
  const { url, title, description, type, immediate, tags} = req.body;
  const uid = uuidv4();

  sql = `INSERT INTO Bookmarks (Id, Url, Title, Description, Type, Immediate, Tags) VALUES(?,?,?,?,?,?,?)`;

  try {
    db.run(sql, [uid, url, title, description, type, immediate, tags], (error) => {
      if (error) {
        return res.json({
          status: 500,
          success: false,
          error: 'Ошибка базы данных при добавлении закладки'
        });
      }

      return res.json({
        status: 200,
        success: true,
        id: uid,
      });
    });
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
      error: 'Ошибка выполнения базы данных'
    });
  }
});

router.post('/delete', (req, res) => {
  const { id } = req.body;

  sql = 'DELETE FROM Bookmarks WHERE Id=?';

  try {
    db.run(sql, [id], (error) => {
      if (error) {
        return res.json({
          status: 500,
          success: false,
          error: 'Ошибка базы данных при удалении закладки'
        });
      }
  
      return res.json({
        status: 200,
        success: true
      });    
    });
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
      error: 'Ошибка выполнения базы данных'
    });
  }
});

export default router;
