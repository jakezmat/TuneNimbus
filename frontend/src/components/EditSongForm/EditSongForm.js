import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editSongForm } from "../../store/songs";
import { useParams } from "react-router-dom";
import { getSongDeets } from "../../store/songs";
const EditSongForm = ({ song }) => {
  const dispatch = useDispatch();
  const { songId } = useParams();
  const [title, setTitle] = useState(song.title);
  const [description, setDescription] = useState(song.description);
  const [url, setUrl] = useState(song.url);
  const [previewImage, setPreviewImage] = useState(song.previewImage);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(getSongDeets(songId));
  }, [dispatch, title, description, url, previewImage, errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...song,
      id: songId,
      title,
      description,
      url,
      previewImage,
    };
    if (!title || !url || title === "" || url === "") {
      setErrors([]);
      return dispatch(songForm(payload)).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
    let songEdit = await dispatch(editSongForm);
    if (songEdit) window.alert("Your song has been updated.");
  };

  return (
    <form>
      <h1>Edit Your Song</h1>
      <h3>{song.title}</h3>
      <ul>
        {errors.map((e, i) => {
          if (e !== "Invalid value") {
            return <li key={i}>{e}</li>;
          }
        })}
      </ul>
      
    </form>
  );
};
