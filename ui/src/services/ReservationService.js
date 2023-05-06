export async function getAllReservations() {

    const response = await fetch('/api/reservations/getReservations', {method: 'GET'});
    return await response.json();
}

export async function createReservation(data) {
    const response = await fetch(`/api/reservations/createReservation`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    return await response.json();
}

export async function deleteReservation(reservationId) {
    const response = await fetch(`/api/reservations/deleteReservation/${reservationId}`, {method: 'DELETE'})
    return await response.json();
}

export async function updateReservation(data) {
    const response = await fetch(`/api/reservations/updateReservation`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    return await response.json();
}