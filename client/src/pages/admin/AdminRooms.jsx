import { useState, useEffect } from 'react'
import { getRooms } from '../../services/rooms.service.js'
import { updateRoomImage } from '../../services/admin.service.js'

function AdminRooms() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [prix, setPrix] = useState({})
  const [fichier, setFichier] = useState({})
  const [erreur, setErreur] = useState({})
  const [succes, setSucces] = useState({})

  useEffect(() => {
    getRooms()
      .then(setRooms)
      .finally(() => setLoading(false))
  }, [])

  async function handleSubmit(e, room) {
    e.preventDefault()
    setErreur({})
    setSucces({})

    const formData = new FormData()
    if (prix[room.id]) formData.append('price', prix[room.id])
    if (fichier[room.id]) formData.append('image', fichier[room.id])

    try {
      const roomMisAJour = await updateRoomImage(room.id, formData)
      setRooms((prev) => prev.map((r) => r.id === room.id ? roomMisAJour : r))
      setSucces((prev) => ({ ...prev, [room.id]: 'Chambre mise à jour !' }))
    } catch (err) {
      setErreur((prev) => ({ ...prev, [room.id]: err.message }))
    }
  }

  if (loading) return <p>Chargement...</p>

  return (
    <>
      <h1>Chambres</h1>
      <div className="admin-card-list">
        {rooms.map((room) => (
          <div key={room.id} className="admin-card">

            <div className="admin-room-preview">
              <img src={room.image} alt={room.name} className="admin-room-img" />
              <div>
                <strong>{room.name}</strong>
                <p>Prix actuel : {room.price} € / nuit</p>
              </div>
            </div>

            <form className="admin-room-form" onSubmit={(e) => handleSubmit(e, room)}>

              {erreur[room.id] && <p className="admin-form-error">{erreur[room.id]}</p>}
              {succes[room.id] && <p className="admin-form-succes">{succes[room.id]}</p>}

              <div className="resa-field">
                <label>Nouveau prix (€)</label>
                <input
                  type="number"
                  placeholder={room.price}
                  value={prix[room.id] ?? ''}
                  onChange={(e) => setPrix((prev) => ({ ...prev, [room.id]: e.target.value }))}
                />
              </div>

              <div className="resa-field">
                <label>Nouvelle image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFichier((prev) => ({ ...prev, [room.id]: e.target.files[0] }))}
                />
              </div>

              <button type="submit" className="btn-success">Mettre à jour</button>
            </form>

          </div>
        ))}
      </div>
    </>
  )
}

export default AdminRooms
