export async function getAvailableRooms(params) {
    const {
        date,
        startPeriod,
        endPeriod,
        capacity,
        equipements
    } = params;
    const response = await fetch('/api/rooms/getAvailableRooms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                date: date || undefined,
                startPeriod: startPeriod || undefined,
                endPeriod: endPeriod || undefined,
                capacity: capacity || undefined,
                equipements: equipements || undefined
            }
        )
    });
    return await response.json();
}

export async function createRoom(data) {
    const response = await fetch(`/api/rooms/createRoom`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {room: data}
        )
    })
    return await response.json();
}

export async function deleteRoom(roomId) {
    const response = await fetch(`/api/rooms/deleteRoom/${roomId}`, {method: 'DELETE'})
    return await response.json();
}

export async function updateRoom(data) {
    const response = await fetch(`/api/rooms/updateRoom`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {room: data}
        )
    })
    return await response.json();
}
