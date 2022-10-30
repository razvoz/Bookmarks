import axios from 'axios';
const API_URL = 'http://localhost:3000/api';

interface IBookmark {
  Id: string,
  Url: string,
  Title: string,
  Description: string,
  Type: string,
  Immediate: boolean,
  Tags?: string,
}

const getBookmarks = async () => {
  try {
    const { data: { data } } = await axios.get(`${API_URL}/bookmarks`);

    return data.map((bookmark: IBookmark) => ({
      id: bookmark.Id || '',
      url: bookmark.Url || '',
      title: bookmark.Title || '',
      description: bookmark.Description || '',
      type: bookmark.Type || '',
      immediate: Boolean(bookmark.Immediate) || false,
      tags: bookmark.Tags ? bookmark.Tags.split(';') : [],
    }));
  } catch ({ message }) {
    return {
      success: false,
      error: message,
    };
  }
}

const addBookmark = async (
  url: string,
  title: string,
  description: string,
  type: string,
  immediate: boolean,
  tags: string[],
) => {
  try {
    return await axios.post(`${API_URL}/bookmarks/add`, {
      url,
      title,
      description,
      type,
      immediate,
      tags: tags.join(';'),
    })
    .then((resp) => {
      const { success, error, id } = resp.data;
      if (!success) {
        console.log(`ERROR: ${error}`);
        return { success: false };
      }

      return { success: true, data: { id } };
    });
  } catch ({ message }) {
    return {
      success: false,
      error: message
    };
  }
}

const deleteBookmark = async (id: string) => {
  try {
    return await axios.post(`${API_URL}/bookmarks/delete`, { id })
    .then(resp => {
      if (!resp.data.success) {
        console.log(`ERROR: ${resp.data.error}`);

        return { success: false };
      }

      return { success: true };
    });
  } catch ({ message }) {
    return {
      success: false,
      error: message,
    };
  }
}

const getTags = async ()  => {
  try {
    const { data: { data } } = await axios.get(`${API_URL}/bookmarks/tags`);

    return data;
  } catch ({ message }) {
    return {
      success: false,
      error: message,
    };
  }
}

export default {
  getBookmarks,
  addBookmark,
  deleteBookmark,
  getTags
};

