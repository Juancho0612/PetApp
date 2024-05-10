// api.js

const API_URL = 'https://a5a6-181-135-33-107.ngrok-free.app'

export const loginUser = async (email, password) => {
    console.log(email,password)
  try {
    const response = await fetch(`${API_URL}/user/${email}/${password}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log("response:" + response)
    const jr = await response.json()
    console.log(jr)
    return jr
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

export const registerUser = async (
    name,
    email,
    number,
    password,
    userType,
    latitude,
    longitude
  ) => {
    try {
      const response = await fetch(`${API_URL}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          number,
          password,
          type: userType,
          latitude,
          longitude,
          online_status: true,
        }),
      });
  
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

export const updateLocation = async (userId, latitude, longitude) => {
  try {
    const response = await fetch(`${API_URL}/user/${userId}/location`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        latitude,
        longitude,
      }),
    })

    if (response.status !== 200) {
      throw new Error(
        `Server returned status ${response.status}: ${response.statusText}`
      )
    }
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

export const getUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.status === 200) {
      return await response.json()
    } else {
      throw new Error(
        `Server returned status ${response.status}: ${response.statusText}`
      )
    }
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

export const updateUserStatus = async (userId, onlineStatus) => {
  try {
    const response = await fetch(`${API_URL}/user/onlineStatus`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        onlineStatus: onlineStatus,
      }),
    })

    if (response.status === 200) {
      return await response.json()
    } else {
      throw new Error(
        `Server returned status ${response.status}: ${response.statusText}`
      )
    }
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}
