// Fetch all rooms
export const getRooms = async () => {
    const response = await fetch('http://localhost:3000/rooms');

    if (!response.ok) {
        throw new Error('Failed to fetch all rooms');
    }

    return response.json();
}

// Fetch a single room by ID
export const getRoom = async (id) => {
    const response = await fetch(`http://localhost:3000/rooms/${id}`);

    if (!response.ok) {
        throw new Error('Failed to fetch the room');
    }

    return response.json();
    
}

// Create a room
export const createRoom = async (room) => {
    const response = await fetch('http://localhost:3000/rooms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(room),
    });

    if (!response.ok) {
        throw new Error('Failed to create the room');
    }

    return response.json();
}

// Update a room
export const updateRoom = async (id, room) => {
    const response = await fetch(`http://localhost:3000/rooms/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(room),
    });

    if (!response.ok) {
        throw new Error('Failed to update the room');
    }
    return response.json();
}

// Delete a room
export const deleteRoom = async (id) => {
    const response = await fetch(`http://localhost:3000/rooms/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete the room');
    }
}